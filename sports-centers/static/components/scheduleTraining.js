Vue.component("scheduleTraining",{
    data:function(){
        return{
            training:{trainingId:"",title:"",type:"",center:null,durationMins:0,coach:null,description:"",imagePath:""},
            customer:null,
            feedback:null,
            dateTime:null,
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
            <div class="container">
                <div class="d-flex flex-column align-items-center justify-content-center mt-5">
                    <h3>Zakazivanje treninga</h3>
                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Naziv:</span>
                        <input class="form-control" type="text" name="title" v-model="training.title" disabled/>
                    </div>

                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Opis:</span>
                        <input class="form-control" type="text" name="desc" v-model="training.description" disabled/>
                    </div>
                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Trajanje:</span>
                        <input class="form-control" type="text" name="duration" v-model="training.durationMins" disabled/>
                    </div>
                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Datum i vreme:</span>
                        <input class="form-control" type="datetime-local" name="date" v-model="dateTime" required/>
                    </div>
                    <button class="btn btn-primary button-green align-self-end mt-2" @click="scheduleTraining" :disabled="!dateTime">Zakazi</button>
                    <div v-if="feedback" class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                        <p>{{feedback}}</p>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
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
				console.log(response.data);
				this.$router.app.username = response.data.userName;
                this.$router.app.login = response.data.role;
                if(this.$router.app.login!="CUSTOMER"){
                    router.push(`/403`);
                }  
                this.customer = response.data;
                this.loggedUserType = this.$router.app.login;
				this.loggedUserName = this.$router.app.username;
                this.userLogedIn = true;
            }
        });
        axios.get('rest/getTraining',{
            params:{
                trainingId: String(this.$route.params.trainingId)
            }
        })
        .then(response=>{
            if(response.data!="FAILIURE"){
                this.training = response.data;
            }
            else{
                this.feedback = "Greska ne postoji taj trenining";
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
        scheduleTraining: function(){
            if(this.dateTime!=null){
                var trainingHistory = {historyId:"",date:this.dateTime,trainingId:this.training.trainingId,customerId:this.customer.userName,coachId:this.training.coach.userName};
                if(this.canTrainingBeModified(trainingHistory)){
                    axios.post("rest/addTrainingHistory",trainingHistory)
                    .then(res =>{
                        if(res.data === "FAILIURE"){
                            this.feedback = "Greska upis nije uspeo";
                        }
                        else{
                            this.feedback = "Trening uspesno zakazan, povratak na pocetnu";
                            setTimeout(() => {  router.push(`/`) }, 1500);
                        }
                    });
                }
                else{
                    this.feedback = "Trening je moguce zakazati tek nakosutra";
                }
            }
        },
        trainingDateConverter: function(training){
            var currentDateDate = training.date.split("T")[0].split("-");
            var currentDateTime = training.date.split("T")[1].split(":");
            return new Date(currentDateDate[0],currentDateDate[1]-1,currentDateDate[2],currentDateTime[0],currentDateTime[1],0,0);
        },
        canTrainingBeModified: function(training){
            var trainingDate = this.trainingDateConverter(training);
            trainingDate.setDate(trainingDate.getDate()-2);
            if(new Date() < trainingDate){
                return true;
            }
            return false;
        },
    }
})