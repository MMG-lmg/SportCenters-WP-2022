Vue.component("profiles",{
    data: function(){
        return{
            admins:null,
            customers:null,
            managers:null,
            coaches:null
        } 
    },
    template:`
    <div>
        <h1>Administratori</h1>
        <table>
            <tr>
                <th>Koriscnicko ime</th>
                <th>Ime</th>
                <th>Pol</th>
                <th>Datum rodjenja</th>
                <th>Uloga</th>
            </tr>
            <tr v-for="admin in admins">
                <td>{{admin.userName}}</td>
                <td>{{admin.name}}</td>
                <td>{{admin.gender}}</td>
                <td>{{admin.dateOfBirth}}</td>
                <td>{{admin.role}}</td>
            </tr>
        </table>
        <h1>Menadzeri</h1>
        <h1>Treneri</h1>
        <h1>Kupci</h1>
    </div>
    `,
    mounted(){
        axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){
                //send forbiden
            }
            else{
				this.$router.app.username = response.data.userName;
				this.$router.app.login = response.data.role;
            }
        });
        axios.get("rest/getAdmins")
        .then(response=>{
            if(response.data == null){

            }
            else{
                console.log(response.data)
				this.admins = response.data;
            }
        })
    },
    methods:{
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
    }
});