Vue.component("addCenter",{
    data:function(){
        return{
            centerTitle:"",
            type:"",
            image:null,
            workHoursStart:null,
            workHoursEnd:null,
            street :"",
            streetNumber :"",
            city :"",
            zipCode :"",
            latitude:0,
            longitude:0,
            error:"",
            selectedManager:null,
            freeManagers:null,
            manager:{userName:"",password:"",name:"",gender:"",dateOfBirth:"",role:"MENAGER",SportCenterTitle:""},
            passwordCheck:"",
            loggedUserType:"",
			loggedUserName:"",
            userLogedIn: false,
            feedbackPopup: false,
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
                <h3>Unos novog spotskog centra</h3>
                <div class=" input-group mt-2">	
                    <span class="input-group-text">Naziv sportskog centra:</span>
                    <input type="text" class="form-control" name="title" v-model="centerTitle"></input>
                </div>

                <div class=" input-group mt-2">	
                    <span class="input-group-text">Tip sportskog centra:</span>
                    <select class="form-select" name="type" v-model="type">
                        <option value="SPORTS_CENTER">Sportski centar</option>
                        <option value="GYM">Teretana</option>
                        <option value="POOL">Bazen</option>
                        <option value="DANCE_STUDIO">Plesni studio</option>
                    </select>
                </div>
                
                <div class=" input-group mt-2">	
                    <span class="input-group-text">Logo sportskog centra:</span>
                    <input type="file" class="form-control" name="logo" ref="imgUpload" @change="onFileInput($event)"></input>
                </div>

                <img :src="image" class="w-25"></img>
                <button class="btn btn-primary button-green mt-2 align-self-end" @click="removeImage">Ukloni logo</button>
            
            

                <div class=" input-group mt-2">	
                    <span class="input-group-text">Radno vreme od:</span>
                    <input type="number" class="form-control" name="timeStart" min="0" max="24" v-model="workHoursStart"></input>
                    <span class="input-group-text">do:</span>
                    <input type="number" class="form-control" name="timeEnd" min="0" max="24" v-model="workHoursEnd"></input>
                </div>
                
                
                <div class=" input-group mt-2">	
                    <span class="input-group-text">Koordinate:</span>
                    <input type="number" class="form-control" v-model="latitude"></input>
                    <span class="input-group-text">:</span>
                    <input type="number" class="form-control" v-model="longitude"></input>
                </div>

                <div class=" input-group mt-2">	
                    <span class="input-group-text">Ulica:</span>
                    <input type="text" class="form-control" name="street" v-model="street"></input>
                    <span class="input-group-text">Broj:</span>
                    <input type="text" class="form-control" name="sNumber" v-model="streetNumber"></input>
                </div>
            
                <div class=" input-group mt-2">	
                    <span class="input-group-text">Grad:</span>
                    <input type="text" class="form-control" name="city" v-model="city"></input>
                    <span class="input-group-text">Postanski broj:</span>
                    <input type="number" class="form-control" name="zip" v-model="zipCode"></input>
                </div>

                <div v-if="freeManagers" class=" input-group mt-2">
                    <span class="input-group-text">Menadzer:</span>
                    <select class="form-select" v-model="selectedManager">
                        <option v-for="manager in freeManagers" :value="manager">{{manager.userName}}:{{manager.name}}</option>
                    </select>
                </div>

                <div v-if="!freeManagers">
                    <h3>Dodavanje novog menadzera</h3>
                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Korisnicko ime:</span>
                        <input type="text" class="form-control" v-model="manager.userName" name="username">
                    </div>

                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Ime:</span>
                        <input class="form-control" type="text" v-model="manager.name" name="name">
                    </div>
                    
                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Lozinka:</span>
                        <input class="form-control" type="password" v-model="manager.password" name="password">
                    </div>

                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Ponoviti lozinku:</span>
                        <input class="form-control" type="password" v-model="passwordCheck" name="passwordCheck">
                    </div>
                    
                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Pol:</span>
                        <select class="form-select" ref="genderCombo" v-model="manager.gender" name="gender">
                            <option value="MALE" selected>Muski</option>
                            <option value="FEMALE">Zenski</option>
                        </select>
                    </div>

                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Datum rodjenja:</span>
                        <input class="form-control" type="date" v-model="manager.dateOfBirth" name="date">
                    </div>  

                </div>
                <button class="btn btn-primary button-green mt-2 align-self-end" v-if="checkData" @click="addCenter">Dodaj centar</button>
                <div v-if="error" class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                    <p>{{error}}</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div v-if="feedbackPopup" class="alert alert-success mt-2" role="alert">
                    <p> Centar {{centerTitle}} uspesno dodat</p>
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
        axios.get("rest/getFreeManagers")
        .then(response=>{
            this.freeManagers = response.data;
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
        addCenter: async function(){
            var canAdd = await this.canAddCenter();
            if(canAdd){
                if(this.checkData()){
                    var SportsCenter = {centerId: 0, centerTitle: this.centerTitle, type: this.type, status:"CLOSED",
                    location:{ latitude: this.latitude, longitude: this.longitude, address: {street: this.street, streetNumber: this.streetNumber, city:this.city, zipCode:this.zipCode}},
                    logoPath: this.image.split(",")[1], grade: 0, workHours:[this.workHoursStart, this.workHoursEnd]
                    };
                    this.axiosAddCenter(SportsCenter);
                }
                else{
                    this.error="Sva polja moraju biti popunjena";
                }
            }
            else{
                this.error="Sva polja moraju biti popunjena";
            }
        },
        canAddCenter: function(){
            console.log("can add center");
            if(!this.freeManagers){
                if(this.checkManager()){
                    this.addManager();
                    this.manager.sportsCenterId = this.centerId;
                    this.selectedManager = this.manager;
                    return true;
                }
                else{
                    this.error="Polja menadzera nisu popunjena sva";
                    return false;
                }
                
            }
            else{
                console.log("free managers true");
                if(this.selectedManager){
                    console.log("WAAAAA");
                    this.selectedManager.sportsCenterId = this.centerId;
                    return true;
                }
            }
            return false;
        },
        axiosAddCenter:function(SportsCenter){
            console.log("axios add");
            axios.post("rest/centers/add", SportsCenter)
            .then(res=>{
                if(res.data==="FAILIURE"){
                    this.error="Greska dodavanje centra, neuspesno!";
                }
                else{
                    this.feedbackPopup = true;
                    console.log("Centar uspesno dodat");
                    this.selectedManager.sportsCenterId = res.data;
                    this.axiosEditManager();
                }
            });
        },
        axiosEditManager:function(){
            console.log("axios eddit");
            axios.post("rest/editManager",this.selectedManager).then(
                res=>{
                    if(res.data==="FAILIURE"){
                        this.error="Izmena menadzera, neuspesno!";
                    }
                    else{
                        setTimeout(() => {  router.push(`/`) }, 5000);
                    }
                    
                }
            );  
        },
        checkData: function(){
            console.log("c data");
            if(this.centerTitle===null || this.centerTitle==="" || 
                this.type===null || this.type==="" || 
                this.image===null || this.image==="" || 
                this.workHoursStart===null || this.workHoursStart==="" || 
                this.workHoursEnd===null || this.workHoursEnd==="" || 
                this.centerTitle===null || this.centerTitle==="" || 
                this.streetNumber===null || this.streetNumber==="" || 
                this.street===null || this.street==="" || 
                this.city===null || this.city==="" || 
                this.zipCode===null || this.zipCode==="" || 
                this.latitude===null || this.latitude===0 || 
                this.longitude===null || this.longitude===0)
            {
                return false;
            }
            else{
                return true;
            }
        },
        checkManager: function(){
            if(this.manager.userName===null || this.manager.userName==="" || 
            this.manager.password===null || this.manager.password==="" || 
            this.passwordCheck===null || this.passwordCheck==="" || 
            this.manager.name===null || this.manager.name==="" || 
            this.manager.gender===null || this.manager.gender==="" || 
            this.manager.dateOfBirth===null){}
            else{
                if(this.passwordCheck === this.manager.password){
                    return true;
                }
                this.error="Lozinke se moraju poklapati";
            }
            return false;
        },
        addManager:function(){
            axios.post("rest/addManager", this.manager)
            .then(res =>{
                if(res.data ==="FAILIURE"){
                }
                else{
                    this.error="Manadzer dodat";
                }
            });
        },
        onFileInput: function(e){
            var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
            var files = e.target.files;
            if(!files.length){
                return;
            }
            var fileExtension = (files[0].name).match(patternFileExtension)[1];
            if(fileExtension=="png" || fileExtension=="jpg" || fileExtension=="jpeg" || fileExtension=="gif"){
                this.createImage(files[0]);
            }
            else{
                alert("odabrani file mora biti slika");
                this.removeImage();
            }
        },
        createImage: function(file){
            var reader = new FileReader();

            reader.onload = (e) =>{
                this.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function(){
            this.image="";
            this.$refs.imgUpload.value = null;
        }
    }
});