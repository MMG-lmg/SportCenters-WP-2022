Vue.component("centers",{
	data: function(){
		return{
			centers:null,
			filteredCenters:null,
			sortName:0,
			nameSearch:"",
			statusSerach:""
		}
	},
	template:`
	<div>
		<h3> Sportski centri </h3>
		<button v-on:click=resetSearch>Ponisti pretragu</button>
		<table border = "1">
			<tr>
				<th>Logo</th>
    			<th><a v-on:click=sortByName>Naziv</a><input ref="titleField" type="text" v-model="nameSearch" v-on:keyup="searchByName"></input></th>
    			<th>Tip</th>
    			<th>
	    			<p>Status</p> 
	    			<select ref="statusCombo" v-model="statusSerach" @change="searchByGrade">
	    				<option disabled value="">Svi</option>
						<option value="open">Otvoreno</option>
						<option value="closed">Zatvoreno</option>
					</select>
				</th>
    			<th>Adresa</th>
    			<th>Prosecna ocena</th>
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
	</div>
	`,
	mounted(){
		axios.get('rest/centers/')
			.then(response=>{this.centers = response.data
				this.filteredCenters = this.centers;
			})
		
	},
	methods:{
		locationToString: function(sc){
			return sc.location.latitude +","+ sc.location.longitude +"\n"
			+sc.location.address.street +","+ sc.location.address.streetNumber
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
			this.nameSearch="";
			this.statusSerach="";
			this.filteredCenters = this.centers;
			
		},
		searchByName: function(){
			if(this.nameSearch!==''){
				this.filteredCenters = this.centers.filter(item =>
				item.centerTitle.toLowerCase().includes(this.nameSearch.toLowerCase())
				);
			}
		},
		searchByGrade: function(){
			if(this.statusSerach === "open"){
				this.filteredCenters = this.centers.filter(item => item.status === "OPEN");
			}
			else if(this.statusSerach === "closed"){
				this.filteredCenters = this.centers.filter(item => item.status === "CLOSED");
			}
		}
	}
});
