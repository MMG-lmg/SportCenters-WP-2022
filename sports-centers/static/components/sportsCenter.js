Vue.component("center",{
    data: function(){
        return{
            center:null,
            error:"",
            addNew:0,
            editExisting:0,
            coaches:null,
            image:null,
            newTraining:{trainingId:"",title:"",type:"PERSONAL",centerId:"",durationMins:0,coachId:"",description:"",imagePath:"",price:0},
            trainigsList:null,
            trainingHistory:null,
            editTraining:null,
            selectedTraining:null,
            visitingCustomer:null,
            allCustomers:null,
            activeMemberships:null,
            confirmButtonCheck:0,
            loggedUserType:"",
			loggedUserName:"",
            userLogedIn: false,
            feedback:null
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
            <div v-if="error" class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                <p>{{error}}</p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class="d-flex flex-column" v-if="center">
                <h3>{{center.centerTitle}}</h3> 
                <div class="d-lg-flex mt-2 mb-2">
                    <img class="img-thumbnail w-25" v-bind:src="'data:image/png;base64,' + center.logoPath"/>
                    <div class=" m-2 d-lg-flex flex-column">
                        <p>Naziv: {{center.centerTitle}}</p>
                        <p>Tip: {{typeToString(center.type)}}</p>
                        <p>Status: {{center.status}}</p>
                        <p>Adresa: {{locationToString(center.location)}}
                        <p>Prosecna ocena: {{center.grade}}</p>
                        <p>Radno vreme: {{workHoursToString(center.workHours)}}</p>
                    </div>
                </div> 
                <div v-if="selectedTraining">
                    <h3>Poseta treninga</h3>
                    <img v-if="selectedTraining" v-bind:src="'data:image/png;base64,' + selectedTraining.imagePath" width="70" height="80"/></td>
                    <p>{{selectedTraining.title}}</p>
                    <p>{{selectedTraining.description}}</p>
                    <div class=" input-group m-1">	
						<span class="input-group-text">Korisnik:</span>
						<select class="form-select" v-model="visitingCustomer" name="customer" @change="checkCustomerMembership">
                            <option v-for="customer in allCustomers" :value="customer.userName">{{customer.userName}}-{{customer.name}}</option>
                        </select>
					</div>
                    <button class="btn btn-primary button-green" @click="visitCenter" :disabled="!confirmButtonCheck">Potvrdi</button>
                </div>         
                <table class="table" v-if="trainigsList">
                    <tr>
                        <th>Slicica traninga</th>
                        <th>Opis treninga</th>
                        <th>Ime trenera</th>
                        <th>Cena treninga</th>
                        <th>Izmena treninga</th>
                        <th>Poseta treninga</th>
                    </tr>
                    <tr v-for="training in trainigsList">
                        <td><img v-bind:src="'data:image/png;base64,' + training.imagePath" width="70" height="80"/></td>
                        <td>{{training.description}}</td>
                        <td>{{training.coach.name}}</td>
                        <td v-if="training.price===0">Trening nema doplatu.</td>
                        <td v-if="training.price!=0">{{training.price}}</td>
                        <td><button class="btn btn-primary button-green" @click="loadEditTraining(training)">Izmeni</button></td>
                        <td><button class="btn btn-primary button-green" @click="trainingSelected(training)">Poseta</button></td>
                    </tr>
                </table>


                <table class="table" v-if="trainingHistory">
                    <tr>
                        <th>Naziv traninga</th>
                        <th>Naziv centra</th>
                        <th>Datum treninga</th>
                        <th>Cena treninga</th>
                    </tr>
                    <tr v-for="history in trainingHistory">
                        <td>{{history.training.title}}</td>
                        <td>{{history.training.center.centerTitle}}</td>
                        <td><pre>{{dateReformater(history.date)}}</pre></td>
                        <td v-if="history.training.price===0">Trening nema doplatu.</td>
                        <td v-if="history.training.price!=0">{{history.training.price}}</td>
                    </tr>
                </table>
                <div  class=" d-flex flex-column mt-2 mb-2" v-if="addNew">
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Naziv treninga:</span>
                        <input class="form-control"  type="text" name="title" v-model="newTraining.title"></input>
                    </div>
                        
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Slicica Treninga:</span>
                        <input class="form-control" type="file" name="logo" ref="imgUpload" @change="onFileInput($event)"></input>
                    </div>

                    <img :src="image" class="w-25"></img>
                    <button class="btn btn-primary button-green mt-2 align-self-end" @click="removeImage">Ukloni logo</button>

                    <div class=" input-group m-1">	
                        <span class="input-group-text">Tip treninga:</span>
                        <select class="form-select" ref="typeCombo" name="type" v-model="newTraining.type">
                            <option value="PERSONAL" selected>Personalni</option>
                            <option value="GROUP">Grupni</option>
                        </select>
                    </div>
                
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Trajanje treninga:</span>
                        <input class="form-control" type="number" name="duration" v-model="newTraining.durationMins"></input>
                    </div>

                    <div class=" input-group m-1">	
                        <span class="input-group-text">Trener:</span>
                        <select class="form-select" v-model="newTraining.coachId">
                            <option v-for="coach in coaches" :value="coach.userName">{{coach.userName}}:{{coach.name}}</option>
                        </select>
                    </div>

                    <div class=" input-group m-1">	
                        <span class="input-group-text">Opis treninga:</span>
                        <textarea class="form-control" name="description" v-model="newTraining.description" rows="5" cols="40"></textarea>
                    </div>

                    <div class=" input-group m-1">	
                        <span class="input-group-text">Cena treninga:(opciono)</span>
                        <input class="form-control" type="number" name="price" v-model="newTraining.price"></input>
                    </div>
                    <button class="btn btn-primary button-green align-self-end" v-on:click="addTraining"> Dodaj </button>
                </div>
                <div>
                
                <button class="btn btn-primary button-green float-end"  v-if="!addNew" v-on:click="flipAddFlag">Dodavanje novog treninga</button>
                <button class="btn btn-primary button-green float-end"  v-if="addNew" v-on:click="cancelAdd">Odustani od dodavanja</button>

                </div>
                <div class=" d-flex flex-column mt-2 mb-2" v-if="editExisting">
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Naziv treninga:</span>
                        <input class="form-control" type="text" name="title" v-model="editTraining.title" disabled></input>
                    </div>
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Tip treninga:</span>
                        <select class="form-select" ref="typeCombo" name="type" v-model="editTraining.type" disabled>
                            <option value="PERSONAL" selected>Personalni</option>
                            <option value="GROUP">Grupni</option>
                        </select>
                    </div>
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Trajanje treninga:</span>
                        <input class="form-control" type="number" name="duration" v-model="editTraining.durationMins"></input>
                    </div>
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Trener:</span>
                        <input class="form-control" type="text" name="coach" v-model="editTraining.coach.name" disabled></input>
                    </div>
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Opis treninga:</span>
                        <textarea class="form-control" name="description" v-model="editTraining.description" rows="5" cols="40"></textarea>
                    </div>
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Cena treninga:(opciono)</span>
                        <input class="form-control" type="number" name="price" v-model="editTraining.price"></input>
                    </div>
                   
                </div>
            </div>
            <button class="btn btn-primary button-green float-end m-1" v-if="editExisting" v-on:click="comitEditTraining"> Izmeni </button>
            <button class="btn btn-primary button-green float-end m-1" v-if="editExisting" v-on:click="cancelEdit">Odustani od izmene</button>
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
                if(this.$router.app.login!="MENAGER"){
                    router.push(`/403`);
                }
                this.loggedUserType = this.$router.app.login;
				this.loggedUserName = this.$router.app.username;
				this.userLogedIn = true;
            }
        });

        axios.get("rest/centers/view",{
            params:{
                menager: String(this.$router.app.username)
            }
        })
        .then(response=>{
            console.log(response.data);
            if(response.data!="FAILIURE"){
                this.center = response.data;

                axios.get('rest/getTrainingsForCenter',{
                    params:{
                        centerId: this.center.centerId,
                    }
                })
                .then(
                    response=>{
                       this.trainigsList=response.data;
                    }
                );

                axios.get('rest/getHistoryCenter',{
                    params:{
                        centerId: this.center.centerId,
                    }
                })
                .then(
                    response=>{
                       this.trainingHistory=response.data;
                    }
                );
            }
            else{
                console.log("else");
                this.error="menadzer nema sportski centar";
            }
           
        });
        axios.get('rest/getCoaches').then(response=>{
            if(response.data != null){
                this.coaches = response.data;
            }
        });
        axios.get('rest/getCustomers').then(response=>{
            if(response.data != null){
                this.allCustomers = response.data;
            }
        });
        axios.get('rest/Membership/getAllActive').then(response=>{
            if(response.data != null){
                this.activeMemberships = response.data;
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
        typeToString: function(type){
            switch(type){
                case "GYM":
                    return "Teretana";
                case "POOL":
                    return "Bazen";
                case "DANCE_STUDIO":
                    return "Plesni studio";
                default:
                    return "Sportski centar";
            }
        },
        locationToString: function(sc){
            return sc.latitude +","+ sc.longitude +"\n"
			+sc.address.street +","+ sc.address.streetNumber +"\n"
			+sc.address.city;
        },
        workHoursToString: function(hours){
            return hours[0] +" : "+ hours[1];
        },
        emptyFieldsCheck:function(){
            if(this.newTraining.title==null || this.newTraining.title=='' || this.image == null || this.image == '' || this.newTraining.coachId == null || this.newTraining.coachId == '' || this.newTraining.durationMins == 0 || this.newTraining.durationMins == null){
                this.error= "Nisu sva obavezna polja popunjena";
                return false;
            }
            return true;
        },
        flipAddFlag: function(){
            this.addNew=!this.addNew;
        },
        flipEditFlag:function(){
            this.editExisting = !this.editExisting;
        },
        cancelAdd:function(){
            this.newTraining = {trainingId:"",title:"",centerId:"",durationMins:0,coachId:"",description:"",imagePath:""};
            this.addNew = 0;
            this.removeImage();
        },
        cancelEdit:function(){
            this.editTraining = null,
            this.editExisting = 0;
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
        },
        addTraining: function(){
            if(this.emptyFieldsCheck()){
                this.newTraining.centerId = this.center.centerId;
                this.newTraining.imagePath = this.image.split(",")[1];
                axios.post("rest/addTraining",this.newTraining).then(
                    res=>{
                        if(res.data==="FAILIURE"){
                            this.error="Dodavanja treninga, neuspesno!";
                        }
                        else if(res.data==="FAILIURE_NAME"){
                            this.error="Ime treninga vec postoji molimo odaberite drugo!";
                            return;
                        }
                        else{
                            this.error="Uspesna izmena i dodavanja povratak na pocetnu";
                            setTimeout(() => {  router.push(`/`) }, 5000);
                        }
                        
                    }
                )
            }
        },
        comitEditTraining:function(){
            axios.post('rest/editTraining',this.editTraining)
            .then(
                res=>{
                    if(res.data==="FAILIURE"){
                        this.error="Izmena treninga, neuspesno!";
                    }
                    else{
                        this.error="Uspesna izmena, povratak na pocetnu";
                        setTimeout(() => {  router.push(`/`) }, 1500);
                    }
                    
                }
            )
        },
        loadEditTraining:function(training){
            this.flipEditFlag();
            this.editTraining = structuredClone(training);
        },
        trainingTypeToString: function(type){
            switch(type){
                case "GROUP":
                    return "Grupni trening";
                case "PERSONAL":
                    return "Personalni trening";
            }
        },
        dateReformater: function(dateString){
            var date = dateString.split("T");
            return date[0] + "\n" + date[1];
        },
        checkCustomerMembership: function(){
            this.confirmButtonCheck = 0;
            this.activeMemberships.forEach(item=>{
                if(item.customer.userName  === this.visitingCustomer){
                    this.confirmButtonCheck = 1;
                    return;
                }
            });
            if(this.confirmButtonCheck !=1){
                this.error = "Odabrani korisnik nema aktivnu clanarinu";
                setTimeout(() => {  
                    this.visitingCustomer=null; 
                    this.selectedTraining=null;
                    this.error = null;
                }, 1500);
            }
            
        },
        trainingSelected: function(seleceted){
            this.confirmButtonCheck = 0;
            this.selectedTraining = seleceted;
        },
        visitCenter: function(){
            axios.post('rest/addTrainingHistory',{
                historyId:"",
                date: this.getCurrentDateISO(),
                trainingId: this.selectedTraining.trainingId,
                customerId: this.visitingCustomer,
                coachId: this.selectedTraining.coach.userName
                }
            )
            .then(
                res=>{
                    if(res.data==="FAILIURE"){
                        this.error="Upis nove posete treninga je nesupesan!";
                    }
                    else{
                        this.error="Uspesan unos";
                        setTimeout(() => {  
                            this.visitingCustomer=null; 
                            this.selectedTraining=null;
                            this.error = null; 
                        }, 1500);
                    }
                    
                }
            )
        },
        getCurrentDateISO: function(){
            //2022-08-26T13:47
            var now = new Date();
            return now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+"T"+now.getHours()+":"+now.getMinutes();
        }
    }
});