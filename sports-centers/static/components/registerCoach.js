Vue.component("registerCoach",{
    data: function(){
        return{
            coach:{userName: '',password:'',name:'',gender:"",dateOfBirth:"",role:"COACH", pastTrainings:null},
            passwordCheck:'',
            error:"",
            passFlag:true,
            emptyFlag:true,
            feedbackPopup:false,
            error:"",
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
        <div class="d-flex flex-column align-items-center justify-content-center mt-5">
            <h3>Prijava Trenera</h3>
            <form>
                <div class=" input-group mt-2">	
                    <span class="input-group-text">Korisnicko ime:</span>
                    <input type="text" class="form-control" v-model="coach.userName" name="username">
                </div>

                <div class=" input-group mt-2">	
                    <span class="input-group-text">Ime:</span>
                    <input class="form-control" type="text" v-model="coach.name" name="name">
                </div>
                
                <div class=" input-group mt-2">	
                    <span class="input-group-text">Lozinka:</span>
                    <input class="form-control" type="password" v-model="coach.password" name="password">
                </div>

                <div class=" input-group mt-2">	
                    <span class="input-group-text">Ponoviti lozinku:</span>
                    <input class="form-control" type="password" v-model="passwordCheck" name="passwordCheck">
                </div>
                
                <div class=" input-group mt-2">	
                    <span class="input-group-text">Pol:</span>
                    <select class="form-select" ref="genderCombo" v-model="coach.gender" name="gender">
                        <option value="MALE" selected>Muski</option>
                        <option value="FEMALE">Zenski</option>
                    </select>
                </div>

                <div class=" input-group mt-2">	
                    <span class="input-group-text">Datum rodjenja:</span>
                    <input class="form-control" type="date" v-model="coach.dateOfBirth" name="date">
                </div>

                <button class="btn btn-primary button-green mt-2" v-on:click="register">Registracija</button>
            </form>
            <div v-if="error" class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                <p>{{error}}</p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div v-if="feedbackPopup" class="alert alert-success mt-2" role="alert">
                <p> Korisnik {{coach.userName}} uspesno dodat</p>
            </div>
        </div>
    </div>
    `,
    mounted() {
        axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){
                router.push(`/403`);
            }
            else{
				this.$router.app.username = response.data.userName;
                this.$router.app.login = response.data.role;
                if(this.$router.app.login!="ADMIN"){
                    router.push(`/403`);
                }
                this.loggedUserType = this.$router.app.login;
				this.loggedUserName = this.$router.app.username;
				this.userLogedIn = true;
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
		},
        passwordMatch: function(){
            if(this.passwordCheck === this.coach.password){
                this.passFlag = false;
            }
            else{
                this.passFlag = true;
                this.error = "Lozinke nisu iste";
            }
        },
        emptyFields: function(){
            if(this.coach.userName!=='' && this.coach.name!=='' && this.coach.password!=='' && this.coach.gender!== null && this.coach.dateOfBirth!== null){
                this.emptyFlag = false;
            }
            else{
                this.emptyFlag = true;
                this.error = "Neophodno je popuniti sva polja";
            }
        },
        register: function(event){
            event.preventDefault();
            console.log("aa");
            this.passwordMatch();
            this.emptyFields();
            if(this.passFlag === false && this.emptyFlag === false){
                console.log(this.coach);
                axios.post("rest/addCoach", this.coach)
                .then(res =>{
                    if(res.data ==="FAILIURE"){
                        this.error="Greska trener nije dodat";
                    }
                    if(res.data ==="FAILIURE_USERNAME"){
                        this.error="Korisnik sa postojecim korisnickim imenom postoji, odaberite drugo";
                    }
                    else{
                        this.feedbackPopup = true;
                        setTimeout(() => {  router.push(`/`) }, 5000);
                    }
                });
            }
        }
    }
});