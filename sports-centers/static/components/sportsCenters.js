Vue.component("centers",{
	data: function(){
		return{
			centers:null,
			filteredCenters:null,
			sortName:0,
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
	    			<p>Status</p> 
	    			<select ref="statusCombo" v-model="statusSerach" @change="searchByStatus">
	    				<option disabled value="">Svi</option>
						<option value="open">Otvoreno</option>
						<option value="closed">Zatvoreno</option>
					</select>
				</th>
				<th>
					<p>Adresa</p> 
					<input ref="addressField" type="text" v-model="addressSearch" v-on:keyup="searchByAddress"></input>
				</th>
    			<th>
    				<p>ProsecnaOcena</p> 
	    			<select ref="gradeCombo" v-model="gradeSearch" @change="searchByGrade">
	    				<option disabled value="">Svi</option>
						<option value="1">1+</option>
						<option value="2">2+</option>
						<option value="3">3+</option>
						<option value="4">4+</option>
					</select>
				</th>
	    	</tr>
	    	
	    	<tr v-for="(sc, index) in filteredCenters">
	    		<td><img v-bind:src="'data:image/png;base64,' + sc.logoPath" width="50" height="60"/></td>
	    		<td>{{sc.centerTitle}}</td>
	    		<td>{{typeToString(sc)}}</td>
	    		<td>{{statusToString(sc)}}</td>
	    		<td>{{locationToString(sc)}}</td>
	    		<td>{{sc.grade}}</td>
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
		</div>
		<button v-if="userLogedIn" v-on:click="routeToProfile"> Profil </button>
	</div>
	`,
	mounted(){
		axios.get('rest/centers/')
			.then(response=>{this.centers = response.data
				this.filteredCenters = this.centers;
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
				if(a.centerTitle < b.centerTitle)
					return -1;
				if(a.centerTitle > b.centerTitle)
					return 1;
				return 0; 
			}
			return this.filteredCenters.sort(compare);
		},
		sortByNameDesc: function(){
			function compare(a,b){
				if(a.centerTitle < b.centerTitle)
					return 1;
				if(a.centerTitle > b.centerTitle)
					return -1;
				return 0; 
			}
			return this.filteredCenters.sort(compare);
		},
		resetSearch: function(){
			this.$refs.statusCombo.value = "";
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
		}
	}
});

