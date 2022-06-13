Vue.component("centers",{
	data: function(){
		return{
			centers:null,
			filteredCenters:null,
			sortName:0,
			nameSearch:"",
		}
	},
	template:`
	<div>
		<h3> Sportski centri </h3>
		<table border = "1">
			<tr>
				<th>Logo</th>
    			<th><a v-on:click=sortByName>Naziv</a><input type="text" v-model="nameSearch" v-on:keyup="searchByName"></input></th>
    			<th>Tip</th>
    			<th>Status</th>
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
		searchByName: function(){
			if(this.nameSearch!==''){
				this.filteredCenters = this.centers.filter(item =>
				item.centerTitle.toLowerCase().includes(this.nameSearch.toLowerCase())
				)
			}
			else{
				this.filteredCenters = this.centers;
			}
		}
	}
});
