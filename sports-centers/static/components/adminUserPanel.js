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
            <table>
                <tr>
                    <th>Koriscnicko ime</th>
                    <th>Ime</th>
                    <th>Pol</th>
                    <th>Datum rodjenja</th>
                    <th>Uloga</th>
                    <th>Naziv Sportskog Centra</th>
                </tr>
                    <tr v-for="manager in managers">
                    <td>{{manager.userName}}</td>
                    <td>{{manager.name}}</td>
                    <td>{{manager.gender}}</td>
                    <td>{{manager.dateOfBirth}}</td>
                    <td>{{manager.role}}</td>
                    <td>{{manager.SportCenterTitle}}</td>
                </tr>
            </table>
        <h1>Treneri</h1>
        <table>
            <tr>
                <th>Koriscnicko ime</th>
                <th>Ime</th>
                <th>Pol</th>
                <th>Datum rodjenja</th>
                <th>Uloga</th>
            </tr>
            <tr v-for="coach in coaches">
                <td>{{coach.userName}}</td>
                <td>{{coach.name}}</td>
                <td>{{coach.gender}}</td>
                <td>{{coach.dateOfBirth}}</td>
                <td>{{coach.role}}</td>
            </tr>
        </table>
        <h1>Kupci</h1>
        <table>
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
            <tr v-for="customer in customers">
                <td>{{customer.userName}}</td>
                <td>{{customer.name}}</td>
                <td>{{customer.gender}}</td>
                <td>{{customer.dateOfBirth}}</td>
                <td>{{customer.role}}</td>
                <td>{{customer.membershipCost}}</td>
                <td>{{customer.loyalityPoints}}</td>
                <td>{{customer.type}}</td>
            </tr>
        </table>
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
        });
        axios.get("rest/getCoaches")
        .then(response=>{
            if(response.data==null){

            }
            else{
                this.coaches = response.data;
            }
        });
        axios.get("rest/getManagers")
        .then(response=>{
            if(response.data==null){

            }
            else{
                this.managers = response.data;
            }
        });
        axios.get("rest/getCustomers")
        .then(response=>{
            if(response.data==null){

            }
            else{
                this.customers = response.data;
            }
        });
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