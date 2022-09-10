Vue.component("buyMembership",{
    data:function(){
        return{
            membershipOffers:null,
            newMembership:null,
            feedback:"",
            existingMembership:null,
            loggedUserType:"",
			loggedUserName:"",
            userLogedIn: false,
        }
    },
    template:`
        <div>
            <nav class="navbar navbar-expand-xl navbar-light background-Green">
                <div class="container-fluid">
                    <a class="navbar-brand logo-hover"  @click="routeToHome"><strong>Sportski centri</strong></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
            
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link cursor-pointer"  @click="routeToHome">Pocetna</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link cursor-pointer" v-if="!userLogedIn" v-on:click="routeToLogin">Prijava</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link cursor-pointer"  v-if="!userLogedIn" v-on:click="routeToRegister">Registracija</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link cursor-pointer"  v-if="userLogedIn" v-on:click="logout">Odjava</a>
                            </li>
                            <li v-if="loggedUserType == 'ADMIN'" class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle cursor-pointer" data-bs-toggle="dropdown" role="button" aria-expanded="false">Prijave</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item cursor-pointer" v-if="loggedUserType == 'ADMIN'" v-on:click="routeToRegisterCoach"> Prijava trenera </a></li>
                                    <li><a class="dropdown-item cursor-pointer" v-if="loggedUserType == 'ADMIN'" v-on:click="routeToRegisterManager"> Prijava menadzera </a></li>
                                    <li><a class="dropdown-item cursor-pointer" v-if="loggedUserType == 'ADMIN'" v-on:click="routeToAddCenter"> Prijava novog centra </a></li>
                                </ul>	
                            </li>
                            <li class="nav-item cursor-pointer">
                                <a class="nav-link"  v-if="loggedUserType == 'ADMIN'" v-on:click="routeToMembershipOffers"> Prikaz ponuda clanarina</a>
                            </li>
                            <li class="nav-item cursor-pointer">
                                <a class="nav-link"  v-if="loggedUserType == 'ADMIN'" v-on:click="routeToProfilesPanel"> Prikaz svih korisnika</a>
                            </li>
                            <li class="nav-item cursor-pointer">
                                <a class="nav-link"  v-if="loggedUserType == 'MENAGER'" v-on:click="routeToManagerCenter"> Prikaz centra </a>
                            </li>
                            <li class="nav-item cursor-pointer">
                                <a class="nav-link"  v-if="loggedUserType == 'CUSTOMER'" v-on:click="routeToBuyMembership"> Kupovina clanarine</a>
                            </li>
                            <li class="nav-item cursor-pointer">
                                <a class="nav-link"  v-if="userLogedIn" v-on:click="routeToProfile"> Profil-{{loggedUserName}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container pt-1 pb-1">
                <h3>Ponuda clanarina</h3>
                <div class="d-flex flex-wrap">
                        <div class="background-Green m-2 p-2 w-25 rounded text-truncate"  v-if="membershipOffers" v-for="offer in membershipOffers" @click="selectedOffer(offer)">
                            <p class="text-wrap">Opis:{{offer.description}}</p>
                            <p>Tip:{{typeToString(offer.type)}}</p>
                            <p>Broj poseta:{{offer.numOfVisits}}</p>
                            <p>Cena:{{offer.price}}</p>
                        </div>
                    </div>
                
                <div v-if="newMembership">
                    <div class="background-Red p-2 m-1 rounded" v-if="existingMembership">
                        <p>Paznja postoji uplacena aktivna clanarina, kupovinom nove prestaje vazenje stare</p>
                        <p>Opis:{{existingMembership.description}}</p>
                        <p>{{existingMembership.type}}Broj poseta:{{existingMembership.numOfVisits}}</p>
                        <p>Cena:{{existingMembership.price}}</p>
                        <p>Clanarina vazi od {{existingMembership.payDate}} do {{existingMembership.validDue}}</p>
                    </div>
                    <div class="background-Yellow p-2 m-1 rounded">
                        <p>Nova clanarina</p>
                        <p>Opis:{{newMembership.description}}</p>
                        <p>{{newMembership.type}}Broj poseta:{{newMembership.numOfVisits}}</p>
                        <p>Cena:{{newMembership.price}}</p>
                        <p>Clanarina vazi od {{newMembership.payDate}} do {{newMembership.validDue}}</p>
                        <button class="btn btn-primary button-green" @click="buyMembership">Kupi</button>
                    </div>
                </div>
                <div v-if="feedback" class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <p>{{feedback}}</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
    `,
    mounted(){
        axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){
                router.push(`/403`);
            }
            else{
				this.$router.app.username = response.data.userName;
                this.$router.app.login = response.data.role;
                if(this.$router.app.login!="CUSTOMER"){
                    router.push(`/403`);
                }
                this.loggedUserType = this.$router.app.login;
				this.loggedUserName = this.$router.app.username;
                this.userLogedIn = true;
            }
        });

        axios.get('rest/Membership/Offers/getAll')
        .then(response=>{
            if(response.data!="FAILIURE"){
                this.membershipOffers = response.data;
            }
            else{
                this.feedback="Nema ponuda";
            }
        });

        axios.get('rest/Membership/getActive',
        {
            params: {username:this.$router.app.username}
        })
        .then(response=>{
            if(response.data!="FAILIURE"){
                this.existingMembership = response.data;
            }
        });
    },
    methods:{
        routeToHome(){
			router.push(`/`);
		},
		routeToLogin(){
			router.push(`/login`);
		},
		routeToRegister(){
			router.push(`/register`);
		},
		routeToRegisterCoach(){
			router.push(`/register/coach`);
		},
		routeToRegisterManager(){
			router.push(`/register/manager`);
		},
		routeToProfile(){
			router.push(`/profile`);
		},
		routeToProfilesPanel(){
			router.push(`/admin/profiles`);
		},
		routeToManagerCenter(){
			router.push(`/manager/center`);
		},
		routeToAddCenter(){
			router.push(`/admin/addCenter`);
		},
		routeToBuyMembership(){
			router.push(`/customer/buyMembership`);
		},
		routeToMembershipOffers(){
			router.push(`/admin/offers`);
        },
        logout(){
			this.loggedUserType = "";
			this.loggedUserName ="";
			this.$router.app.login ="";
			this.$router.app.username="";
			this.userLogedIn = false;
            axios.get('rest/logout');
            this.routeToHome();
        },
        typeToString: function(type){
            switch (type){
                case "ANNUAL":
                    return "Godisnja";
                case "MONTHLY":
                    return "Mesecna";
                case "WEEKLY":
                    return "Nedeljna";
            }
                
        },
        selectedOffer: function(offer){
            this.newMembership = offer;
            let currentDate =new Date();
            this.newMembership.payDate = currentDate.getFullYear() +"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
            switch(this.newMembership.type){
                case "ANNUAL":
                    this.newMembership.validDue = currentDate.getFullYear()+1 +"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
                    break;
                case "MONTHLY":
                    this.newMembership.validDue = currentDate.getFullYear() +"-"+ (currentDate.getMonth()+2) +"-"+currentDate.getDate();
                    break;
                case "WEEKLY":
                    this.newMembership.validDue = currentDate.getFullYear() +"-"+(currentDate.getMonth()+1)+"-"+ (currentDate.getDate()+7);
                    break;
            }
            this.newMembership.status = "ACTIVE";
            this.newMembership.customerUsername = this.$router.app.username;
        },
        buyMembership:function(){
            axios.post('rest/Membership/add',this.newMembership)
            .then(res=>{
                if(res.data!="SUCCESS"){
                    this.feedback="Neuspesna kupovina!";
                }
                else{
                    this.feedback="Clanarina uspesno kupljena";
                    this.newMembership = null;
                    setTimeout(() => {  router.push(`/`) }, 1500);
                }
            });
        }
    }

});