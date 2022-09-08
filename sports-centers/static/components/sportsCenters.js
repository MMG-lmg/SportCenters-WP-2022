Vue.component("centers",{
	data: function(){
		return{
			centers:null,
			filteredCenters:null,
			sortName:0,
			sortAddress:0,
			sortGrade:0,
			nameSearch:"",
			statusSerach:"",
			gradeSearch:"",
			typeSearch:"",
			addressSearch:"",
			loggedUserType:"",
			loggedUserName:"",
			userLogedIn: false,
		}
	},
	template:`
	<div>	
		<nav class="navbar navbar-expand-xl navbar-light background-Green">
			<div class="container-fluid">
				<a class="navbar-brand"  @click="routeToHome"><strong>Sportski centri<strong></a>
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
						<span class="input-group-text">Naziv:</span>
						<input name="searchName" class="form-control" ref="titleField" type="text" v-model="nameSearch" v-on:keyup="searchByName"></input>
					</div>	
					<div class="input-group m-1">
						<span class="input-group-text">Tip:</span>
						<select class="form-select" name="searchType" ref="typeCombo" v-model="typeSearch" @change="searchByType">
								<option disabled value="">Svi</option>
								<option value="center">Sportski centar</option>
								<option value="gym">Teretana</option>
								<option value="pool">Bazen</option>
								<option value="dance">Plesni studio</option>
						</select>
					</div>
					<div class="input-group m-1">
						<span class="input-group-text">Adresa:</span>
						<input name="searchAddress" class="form-control" ref="addressField" type="text" v-model="addressSearch" v-on:keyup="searchByAddress"></input>
					</div>
					<div class="input-group m-1">
						<span class="input-group-text" id="basic-addon1">Prosecna ocena:</span>
						<select class="form-select" name="searchGrade" ref="gradeCombo" v-model="gradeSearch" @change="searchByGrade">
								<option disabled value="">Svi</option>
								<option value="1">1+</option>
								<option value="2">2+</option>
								<option value="3">3+</option>
								<option value="4">4+</option>
						</select>
					</div>
				</div>
				<button class="btn btn-primary button-green" v-on:click=resetSearch>Ponisti pretragu</button>
				<button class="btn btn-primary button-green" v-on:click=filterOpened>Filtriraj samo otvorene</button>
				
			</div>
		</div>
		<div class="container pt-1 pb-1">
			<table class="table">
				<tr>
					<th>Logo</th>
					<th v-on:click=sortByName>
						Naziv
					</th>
					<th>
						Tip 
					</th>
					<th v-on:click=sortByAddress>
						Adresa 
					</th>
					<th v-on:click=sortByGrade>
						ProsecnaOcena
					</th>
					<th>
						Radno Vreme
					</th>
				</tr>
				<tr v-for="(sc, index) in filteredCenters" v-bind:data-id="sc.centerId"  v-on:click="rowClicked($event)" >
					<td v-if="!sc.expand"><img v-bind:src="'data:image/png;base64,' + sc.logoPath" width="50" height="60"/></td>
					<td v-if="!sc.expand">{{sc.centerTitle}}</td>
					<td v-if="!sc.expand">{{typeToString(sc)}}</td>
					<td v-if="!sc.expand">{{locationToString(sc)}}</td>
					<td v-if="!sc.expand" >{{sc.grade}}</td>
					<td v-if="!sc.expand">{{sc.workHours[0]}}-{{sc.workHours[1]}}</td>
					<td v-if="sc.expand" colspan="6">
						<div>
							<h3>{{sc.centerTitle}}</h3>
							<img v-bind:src="'data:image/png;base64,' + sc.logoPath" width="70" height="80"/>
							<p>Naziv:{{sc.centerTitle}}</p>
							<p>Tip:{{typeToString(sc)}}</p>
							<p>Lokacija:{{locationToString(sc)}}</p>
							<p>Status:{{statusToString(sc)}}</p>
							<p>Prosecna ocena:{{sc.grade}}</p>
							<div v-if="sc.trainings!='FAILIURE'" v-for="training in sc.trainings">
								<p>{{training.title}}</p>
								<img v-bind:src="'data:image/png;base64,' + training.imagePath" width="30" height="35"/>
								<p>{{training.description}}</p>
								<p>{{trainingTypeToString(training.type)}}</p>
								<p>{{training.coach.name}}</p>
								<button v-if="loggedUserType=='CUSTOMER' && training.type=='PERSONAL'"  @click="scheduleTraining(training)">Zakazi trening</button>
								<p v-if="training.type!='PERSONAL'">Samo personalni treninzi se mogu zakazati</p>
							</div>
							
							<p v-if="sc.trainings=='FAILIURE'">Sportski centar jos uvek nema treninge</p>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
	`,
	mounted(){
		axios.get('rest/centers/')
			.then(response=>{ 
				for(var i=0; i<response.data.length; i++){ //add propperty "expand"
					response.data[i]["expand"] = 0;
					response.data[i]["trainings"] = null;
				}
				this.centers = response.data
				this.filteredCenters = this.centers;
				this.sortByStatus();
		});
		axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){
	
            }
            else{
				console.log(response.data)
				this.$router.app.username = response.data.userName;
				this.$router.app.login = response.data.role;
				this.checkLogin();
            }
        });
	},
	methods:{
		checkLogin(){
			if(this.$router.app.login && this.$router.app.username){
				this.loggedUserType = this.$router.app.login;
				this.loggedUserName = this.$router.app.username;
				this.userLogedIn = true;
			}
		},
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
		locationToString: function(sc){
			return sc.location.latitude +","+ sc.location.longitude +"\n"
			+sc.location.address.street +","+ sc.location.address.streetNumber +"\n"
			+sc.location.address.city
		},
		typeToString: function(sc){
			var retVal;
			if(sc.type ==="POOL") retVal = "Bazen";
			else if(sc.type ==="GYM") retVal = "Teretana";
			else if(sc.type === "DANCE_STUDIO") retVal = "Plesni studio";
			else if(sc.type ==="SPORTS_CENTER") retVal = "Sportski centar";
			return retVal;
		},
		statusToString: function(sc){
			var retVal;
			if(sc.status ==="OPEN") retVal = "Otvoreno";
			else retVal="Zatvoreno";
			return retVal;
		},
		trainingTypeToString: function(type){
            switch(type){
                case "GROUP":
                    return "Grupni trening";
                case "PERSONAL":
                    return "Personalni trening";
            }
        },
		sortByName: function(){
			if(this.sortName === 0 ){
				this.sortByNameAsc();
				this.sortName = 1;
			}
			else{
				this.sortByNameDesc();
				this.sortName = 0;
			}
		},
		sortByNameAsc: function(){
			function compare(a,b){
				if(a.centerTitle.toLowerCase() < b.centerTitle.toLowerCase())
					return -1;
				if(a.centerTitle.toLowerCase() > b.centerTitle.toLowerCase())
					return 1;
				return 0; 
			}
			return this.filteredCenters.sort(compare);
		},
		sortByNameDesc: function(){
			function compare(a,b){
				if(a.centerTitle.toLowerCase() < b.centerTitle.toLowerCase())
					return 1;
				if(a.centerTitle.toLowerCase()  > b.centerTitle.toLowerCase() )
					return -1;
				return 0; 
			}
			return this.filteredCenters.sort(compare);
		},
		sortByAddress:function(){
			if(this.sortAddress === 0 ){
				this.sortByAddressAsc();
				this.sortAddress = 1;
			}
			else{
				this.sortByAddressDesc();
				this.sortAddress = 0;
			}
		},
		sortByAddressAsc:function(){
			function compare(a,b){
				if(a.location.address.street.toLowerCase() < b.location.address.street.toLowerCase() )
					return -1;
				if(a.location.address.street.toLowerCase()  > b.location.address.street.toLowerCase() )
					return 1;
				return 0; 
			}
			return this.filteredCenters.sort(compare);
		},
		sortByAddressDesc:function(){
			function compare(a,b){
				if(a.location.address.street.toLowerCase() < b.location.address.street.toLowerCase())
					return 1;
				if(a.location.address.street.toLowerCase() > b.location.address.street.toLowerCase())
					return -1;
				return 0; 
			}
			return this.filteredCenters.sort(compare);
		},
		sortByGrade: function(){
			if(this.sortGrade === 0 ){
				this.sortByGradeAsc();
				this.sortGrade = 1;
			}
			else{
				this.sortByGradeDesc();
				this.sortGrade = 0;
			}
		},
		sortByGradeAsc: function(){
			function compare(a,b){
				if(a.grade < b.grade)
					return -1;
				if(a.grade > b.grade)
					return 1;
				return 0; 
			}
			return this.filteredCenters.sort(compare);
		},
		sortByGradeDesc: function(){
			function compare(a,b){
				if(a.grade < b.grade)
					return 1;
				if(a.grade > b.grade)
					return -1;
				return 0; 
			}
			return this.filteredCenters.sort(compare);
		},
		sortByStatus: function(){
			function compare(a,b){
				if(a.status < b.status){
					return 1;
				}
				if(a.status > b.status){
					return -1;
				}
				return 0; 
			}
			return this.filteredCenters.sort(compare);
		},
		resetSearch: function(){
			this.$refs.titleField.value=null;
			this.$refs.gradeCombo.value="";
			this.$refs.typeCombo.value="";
			this.typeSearch="";
			this.nameSearch="";
			this.addressSearch="";
			this.statusSerach="";
			this.gradeSearch="";
			this.filteredCenters = this.centers;
			
		},
		searchByName: function(){
			if(this.nameSearch!==''){
				this.filteredCenters = this.centers.filter(item =>
				item.centerTitle.toLowerCase().includes(this.nameSearch.toLowerCase())
				);
			}
		},
		searchByAddress: function(){
			if(this.addressSearch!==''){
				this.filteredCenters = this.centers.filter(item =>
				item.location.address.city.toLowerCase().includes(this.addressSearch.toLowerCase())
				);
			}
		},
		searchByStatus: function(){
			if(this.statusSerach === "open"){
				this.filteredCenters = this.centers.filter(item => item.status === "OPEN");
			}
			else if(this.statusSerach === "closed"){
				this.filteredCenters = this.centers.filter(item => item.status === "CLOSED");
			}
		},
		searchByGrade: function(){
			this.filteredCenters = this.centers.filter(item => item.grade >= Number(this.gradeSearch));
		},
		searchByType: function(){
			if(this.typeSearch === "center"){
				this.filteredCenters = this.centers.filter(item => item.type === "SPORTS_CENTER");
			}
			else if(this.typeSearch === "gym"){
				this.filteredCenters = this.centers.filter(item => item.type === "GYM");
			}
			else if(this.typeSearch === "pool"){
				this.filteredCenters = this.centers.filter(item => item.type === "POOL");
			}
			else if(this.typeSearch === "dance"){
				this.filteredCenters = this.centers.filter(item => item.type === "DANCE_STUDIO");
			}
		},
		filterOpened:function(){
			this.filteredCenters = this.centers.filter(item => item.status === "OPEN");
		},
		rowClicked: function(event){
			var id = event.currentTarget.getAttribute("data-id");
			this.flipExpand(id);
			this.getTrainingsForCenter(id,this.findCenter(id));
			
		},
		findCenter: function(id){
			for(let i=0; i < this.centers.length; i ++){
				if(this.centers[i].centerId=== id){
					return this.centers[i];
				}
			}
			return null;
		},
		flipExpand: function(id){
			this.findCenter(id).expand=!this.findCenter(id).expand;
		},
		getTrainingsForCenter:function(id,center){
			axios.get("rest/getTrainingsForCenter",{
				params:{
					centerId: id
				}
			}).then(
				response=>{
					console.log(response.data);
					center.trainings=response.data;
				}
			)
		},
		scheduleTraining: function(training){
			router.push(`/customer/scheduleTraining/${training.trainingId}`);
		}
	}
});

