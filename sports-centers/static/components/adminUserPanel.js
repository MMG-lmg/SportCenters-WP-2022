Vue.component("profiles",{
    data: function(){
        return{
            admins:null,
            customers:null,
            managers:null,
            coaches:null,
            filteredAdmins:null,
            filteredCustomers:null,
            filteredManagers:null,
            filteredCoaches:null,
            nameSearch:'',
            usernameSearch:'',
            sortChooser:'',
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
            <button class="btn btn-primary image-button-small float-end	mb-1 button-green" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSearch" aria-expanded="false" aria-controls="collapseSearch">
                <img src="img/magnifying-glass.png" class="img-fluid" alt="Search">
            </button>
            <div class="collapse" id="collapseSearch">
                <h3 class="m-1">Pretraga</h3>
                <div class="d-lg-flex mt-2 mb-2">
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Ime:</span>
                        <input type="text" class="form-control" name="name"v-model="nameSearch"></input>
                    </div>	
                
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Korisnicko ime:</span>
                        <input type="text" class="form-control" name="username" v-model="usernameSearch"></input>
                    </div>
                    <div class=" input-group m-1">	
                        <span class="input-group-text">Sortiranje po</span>
                        <select class="form-select" v-model="sortChooser" @change="sort" name="sort">
                            <option value="nameAsc">Po imenu rastuce</option>
                            <option value="nameDesc">Po imenu opadajuce</option>
                            <option value="userNAsc">Po korisnickom imenu rastuce</option>
                            <option value="userNDesc">Po korisnickom imenu opadajuce</option>
                            <option value="pointsAsc">Po bodovima rastuce</option>
                            <option value="pointsDesc">Po bodovima opadajuce</option>
                        </select>
                    </div>    
                </div>
                <button class="btn btn-primary button-green" @click="startSearch">Pretrazi</button>
                <button class="btn btn-primary button-green" @click="cancelSearch">Ponisti pretragu</button>
            </div>
                <h1>Administratori</h1>
                <table class="table">
                    <tr>
                        <th>Koriscnicko ime</th>
                        <th>Ime</th>
                        <th>Pol</th>
                        <th>Datum rodjenja</th>
                        <th>Uloga</th>
                    </tr>
                    <tr v-for="admin in filteredAdmins">
                        <td>{{admin.userName}}</td>
                        <td>{{admin.name}}</td>
                        <td>{{admin.gender}}</td>
                        <td>{{admin.dateOfBirth}}</td>
                        <td>{{admin.role}}</td>
                    </tr>
                </table>
                <h1>Menadzeri</h1>
                    <table class="table">
                        <tr>
                            <th>Koriscnicko ime</th>
                            <th>Ime</th>
                            <th>Pol</th>
                            <th>Datum rodjenja</th>
                            <th>Uloga</th>
                            <th>Naziv Sportskog Centra</th>
                        </tr>
                            <tr v-for="manager in filteredManagers">
                            <td>{{manager.userName}}</td>
                            <td>{{manager.name}}</td>
                            <td>{{manager.gender}}</td>
                            <td>{{manager.dateOfBirth}}</td>
                            <td>{{manager.role}}</td>
                            <td v-if="manager.center">{{manager.center.centerTitle}}</td>
                            <td v-if="!manager.center">-</td>
                        </tr>
                    </table>
                <h1>Treneri</h1>
                <table class="table">
                    <tr>
                        <th>Koriscnicko ime</th>
                        <th>Ime</th>
                        <th>Pol</th>
                        <th>Datum rodjenja</th>
                        <th>Uloga</th>
                    </tr>
                    <tr v-for="coach in filteredCoaches">
                        <td>{{coach.userName}}</td>
                        <td>{{coach.name}}</td>
                        <td>{{coach.gender}}</td>
                        <td>{{coach.dateOfBirth}}</td>
                        <td>{{coach.role}}</td>
                    </tr>
                </table>
                <h1>Kupci</h1>
                <table class="table">
                    <tr>
                        <th>Koriscnicko ime</th>
                        <th>Ime</th>
                        <th>Pol</th>
                        <th>Datum rodjenja</th>
                        <th>Uloga</th>
                        <th>Cena clanarine</th>
                        <th>Bodovi lojalnosti</th>
                        <th>Tip kupca</th>
                    </tr>
                    <tr v-for="customer in filteredCustomers">
                        <td>{{customer.userName}}</td>
                        <td>{{customer.name}}</td>
                        <td>{{customer.gender}}</td>
                        <td>{{customer.dateOfBirth}}</td>
                        <td>{{customer.role}}</td>
                        <td>{{customer.membershipCost}}</td>
                        <td>{{customer.loyalityPoints}}</td>
                        <td v-if="customer.type">{{customer.type.type}}</td>
                        <td v-if="!customer.type">-</td>
                    </tr>
                </table>
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
        axios.get("rest/getAdmins")
        .then(response=>{
            if(response.data == null){

            }
            else{
                console.log(response.data)
                this.admins = response.data;
                this.filteredAdmins = this.admins;
            }
        });
        axios.get("rest/getCoaches")
        .then(response=>{
            if(response.data==null){

            }
            else{
                this.coaches = response.data;
                this.filteredCoaches = this.coaches;
            }
        });
        axios.get("rest/getManagers")
        .then(response=>{
            if(response.data==null){

            }
            else{
                this.managers = response.data;
                this.filteredManagers = this.managers;
            }
        });
        axios.get("rest/getCustomers")
        .then(response=>{
            if(response.data==null){

            }
            else{
                this.customers = response.data;
                this.filteredCustomers = this.customers;
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
        roleToString: function(role){
            switch(role){
                case "CUSTOMER":
                    return "Kupac";
                case "ADMIN":
                    return "Administrator";
                case "MENAGER":
                    return "Menadzer";
                case "COACH":
                    return "Trener";
            }
        },
        cancelSearch: function(){
            this.nameSearch='';
            this.usernameSearch='';
            this.filteredAdmins = this.admins;
            this.filteredCoaches = this.coaches;
            this.filteredCustomers = this.customers;
            this.filteredManagers = this.managers;
        },
        startSearch:function(){
            this.searchByName();
            this.searchByUsername();
        },
        searchByName: function(){
            if(this.nameSearch!==''){
                this.filteredCustomers = this.customers.filter(item => item.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
                this.filteredManagers = this.managers.filter(item => item.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
                this.filteredCoaches = this.coaches.filter(item => item.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
                this.filteredAdmins = this.admins.filter(item => item.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
            }
        },
        searchByUsername: function(){
            if(this.usernameSearch!==''){
                this.filteredCustomers = this.customers.filter(item => item.userName.toLowerCase().includes(this.usernameSearch.toLowerCase()));
                this.filteredManagers = this.managers.filter(item => item.userName.toLowerCase().includes(this.usernameSearch.toLowerCase()));
                this.filteredCoaches = this.coaches.filter(item => item.userName.toLowerCase().includes(this.usernameSearch.toLowerCase()));
                this.filteredAdmins = this.admins.filter(item => item.userName.toLowerCase().includes(this.usernameSearch.toLowerCase()));
            }
        },
        sort: function(){
            switch(this.sortChooser){
                case "nameAsc": 
                    this.sortByNameAsc();
                    break;
                case "nameDesc":
                    this.sortByNameDesc();
                    break;
                case "userNAsc":
                    this.sortByUsernameAsc();
                    break;
                case "userNDesc":
                    this.sortByUsernameDesc();
                    break;
                case "pointsAsc":
                    this.sortByPointsAsc();
                    break;
                case "pointsDesc":
                    this.sortByPointsDesc();
                    break;
            }
        },
        sortByNameAsc: function(){
            function compare(a,b){
				if(a.name.toLowerCase() < b.name.toLowerCase()){
					return -1;
				}
				if(a.name.toLowerCase() > b.name.toLowerCase()){
					return 1;
				}
				return 0; 
            }
            this.filteredCustomers.sort(compare);
            this.filteredAdmins.sort(compare);
            this.filteredCoaches.sort(compare);
            this.filteredManagers.sort(compare);
        },
        sortByNameDesc: function(){
            function compare(a,b){
				if(a.name.toLowerCase() < b.name.toLowerCase()){
					return 1;
				}
				if(a.name.toLowerCase() > b.name.toLowerCase()){
					return -1;
				}
				return 0; 
            }
            this.filteredCustomers.sort(compare);
            this.filteredAdmins.sort(compare);
            this.filteredCoaches.sort(compare);
            this.filteredManagers.sort(compare);
        },
        sortByUsernameAsc: function(){
            function compare(a,b){
				if(a.userName.toLowerCase() < b.userName.toLowerCase()){
					return -1;
				}
				if(a.userName.toLowerCase() > b.userName.toLowerCase()){
					return 1;
				}
				return 0; 
            }
            this.filteredCustomers.sort(compare);
            this.filteredAdmins.sort(compare);
            this.filteredCoaches.sort(compare);
            this.filteredManagers.sort(compare);
        },
        sortByUsernameDesc: function(){
            function compare(a,b){
				if(a.userName.toLowerCase() < b.userName.toLowerCase()){
					return 1;
				}
				if(a.userName.toLowerCase() > b.userName.toLowerCase()){
					return -1;
				}
				return 0; 
            }
            this.filteredCustomers.sort(compare);
            this.filteredAdmins.sort(compare);
            this.filteredCoaches.sort(compare);
            this.filteredManagers.sort(compare);
        },
        sortByPointsAsc: function(){
            function compare(a,b){
				if(a.loyalityPoints < b.loyalityPoints){
					return 1;
				}
				if(a.loyalityPoints > b.loyalityPoints){
					return -1;
				}
				return 0; 
            }
            this.filteredCustomers.sort(compare);
        },
        sortByPointsDesc: function(){
            function compare(a,b){
				if(a.loyalityPoints < b.loyalityPoints){
					return -1;
				}
				if(a.loyalityPoints > b.loyalityPoints){
					return 1;
				}
				return 0; 
            }
            this.filteredCustomers.sort(compare);
        }
    },
});