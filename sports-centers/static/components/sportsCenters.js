Vue.component("centers",{
	data: function(){
		return{
			centers:null
		}
	},
	template:`
	<div>
		<h3> Sportski centri </h3>
		<table border = "1">
			<tr>
    			<th>Naziv</th>
    			<th>Cena</th>
	    	</tr>
	    	
	    	<tr v-for="(sc, index) in centers">
	    		<td>{{sc.centerTitle}}</td>
	    		<td>{{sc.type}}</td>
	    		<td>{{sc.status}}</td>
	    		<td>{{sc.location.toString()}}</td>
	    		<td>{{sc.grade}}</td>
		</table>
	</div>
	`
});
