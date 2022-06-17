Vue.component("centersManip",{
	data: function(){
		return {
			title: "CRUD centers",
			btnAdd: "Dodaj",
			btnEdit: "Izmeni",
			btnDelete: "Obrisi",
			id: -1,
			product:{centerId:'',centerTitle:null,type:null,status:null,location:null,logoPath=null,grade:null,workHours:null }
			
		}
	},
	template:`
	<div>
		<h3>{{title}}</h3>
		<form>
		</form>
	</div>
	`,
});