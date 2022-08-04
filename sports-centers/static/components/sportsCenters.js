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
			userLogedIn: false
		}
	},
	template:`
	<div>
		<h3> Sportski centri </h3>
		<button v-on:click=resetSearch>Ponisti pretragu</button>
		<button v-on:click=filterOpened>Filtriraj samo otvorene</button>
		<table border = "1">
			<tr>
				<th>Logo</th>
				<th>
				<a v-on:click=sortByName>Naziv</a>
				<input ref="titleField" type="text" v-model="nameSearch" v-on:keyup="searchByName"></input>
				</th>
				<th>
					<p>Tip</p> 
	    			<select ref="typeCombo" v-model="typeSearch" @change="searchByType">
	    				<option disabled value="">Svi</option>
						<option value="center">Sportski centar</option>
						<option value="gym">Teretana</option>
						<option value="pool">Bazen</option>
						<option value="dance">Plesni studio</option>
					</select>
				</th>
				<th>
					<p v-on:click=sortByAddress>Adresa</p> 
					<input ref="addressField" type="text" v-model="addressSearch" v-on:keyup="searchByAddress"></input>
				</th>
    			<th>
    				<p v-on:click=sortByGrade>ProsecnaOcena</p> 
	    			<select ref="gradeCombo" v-model="gradeSearch" @change="searchByGrade">
	    				<option disabled value="">Svi</option>
						<option value="1">1+</option>
						<option value="2">2+</option>
						<option value="3">3+</option>
						<option value="4">4+</option>
					</select>
				</th>
				<th>
					<p>Radno Vreme</p>
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
							<p>{{training.coach.name}}</p>
						</div>
						<p v-if="sc.trainings=='FAILIURE'">Sportski centar jos uvek nema treninge</p>
					</div>
				</td>
	    	</tr>
		</table>
		<div>
			<button v-if="!userLogedIn" v-on:click="routeToLogin"> Prijava </button>
			<button v-if="!userLogedIn" v-on:click="routeToRegister"> Registracija </button>
			<p v-if="userLogedIn">
				Dobrodosli, {{loggedUserName}}, {{loggedUserType}}
			</p>
			<button v-if="userLogedIn" v-on:click="logout"> Odjava </button>
			<button v-if="loggedUserType == 'ADMIN'" v-on:click="routeToRegisterCoach"> Prijava trenera </button>
			<button v-if="loggedUserType == 'ADMIN'" v-on:click="routeToRegisterManager"> Prijava menadzera </button>
			<button v-if="loggedUserType == 'ADMIN'" v-on:click="routeToProfilesPanel"> Prikaz svih korisnika </button>
			<button v-if="loggedUserType == 'ADMIN'" v-on:click="routeToAddCenter"> Dodavanje novog centra </button>
			<button v-if="loggedUserType == 'MENAGER'" v-on:click="routeToManagerCenter"> Prikaz centra </button>
		</div>
		<button v-if="userLogedIn" v-on:click="routeToProfile"> Profil </button>
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
		}
	}
});

