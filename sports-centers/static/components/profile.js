Vue.component("profile",{
    data: function(){
        return{
            user:{userName:"",password:"",name:"",gender:"",dateOfBirth:"",role:""},
            customer:{membershipCost:0,visitedCenters:null,loyalityPoints: 0,type:null},
            manager:{sportsCenterTitle:""},
            coach:{pastTrainings:null},
            edit:0,
            editUser:{userName:"",password:"",name:"",gender:"",dateOfBirth:"",role:""},
            editCustomer:{membershipCost:0,visitedCenters:null,loyalityPoints: 0,type:null},
            editManager:{sportsCenterTitle:""},
            editCoach:{pastTrainings:null},
        }
    },
    template:`
    <div>
        <h3>Dobrodosli {{user.userName}}</h3>
        <div>
        <label for="uName">Korisnicko ime:</label>
        <input type="text" name="uName" v-model="editUser.userName" :disabled="edit == 0"/>
        </div>
        <p>Ime: {{user.name}}</p>
        <p>Pol: {{user.gender}}</p>
        <p>Datum Rodjenja: {{user.dateOfBirth}}</p>
        <p>Uloga korisnika: {{user.role}}</p>
        <div v-if="this.$router.app.login=='MENAGER'">
            <p>Naziv Sportskog Centra: {{manager.sportsCenterTitle}}</p>
        </div>
        <div v-if="this.$router.app.login=='CUSTOMER'">
            <p>Cena clanarine: {{customer.membershipCost}}</p>
            <p>Poeni lojalnosti(bodovi): {{customer.loyalityPoints}}</p>
            <p>Tip kupca: {{customer.type}}</p>
            <p v-if="customer.visitedCenters==null">Niste posetili ni jedan sportski centar</p>
            <table v-if="customer.visitedCenters!=null">
            <tr>
                <th>Logo</th>
                <th>Naziv</th>
                <th>Tip</th>
                <th>Status</th>
                <th>Adresa</th>
                <th>ProsecnaOcena</th>
            </tr>
            <tr v-for="(sc, index) in customer.visitedCenters">
                <td><img v-bind:src="'data:image/png;base64,' + sc.logoPath" width="50" height="60"/></td>
                <td>{{sc.centerTitle}}</td>
                <td>{{typeToString(sc)}}</td>
                <td>{{statusToString(sc)}}</td>
                <td>{{locationToString(sc)}}</td>
                <td>{{sc.grade}}</td>
            </tr>
            </table>
        </div>
        <button @click="edit=1">Izmeni podatke</button>
        <button v-if="edit==1" @click="this.cancelEdit">otkazi izmene</button>
    </div>
    `,
    mounted(){
        axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){

            }
            else{
				console.log(response.data)
				this.$router.app.username = response.data.userName;
                this.$router.app.login = response.data.role;
                this.fillUserData();
                
            }
        });
    },
    methods:{
        fillUserData: function(){
            if(this.$router.app.login && this.$router.app.username){
                switch(this.$router.app.login){
                    case "ADMIN":
                        axios.get('rest/getAdmin',{
                            params:{
                                username: String(this.$router.app.username)
                            }
                        })
                            .then(response=>{this.user.userName = response.data.userName;
                                    this.user.name = response.data.name;
                                    this.user.gender=response.data.gender;
                                    this.user.dateOfBirth=response.data.dateOfBirth;
                                    this.user.role=response.data.role;
                                    this.resetEditFields();
                                });
                        break;
                    case "MENAGER":
                        axios.get('rest/getManager',{
                            params:{
                                username: String(this.$router.app.username)
                            }
                        })
                            .then(response=>{this.user.userName = response.data.userName;
                                    this.user.name = response.data.name;
                                    this.user.gender=response.data.gender;
                                    this.user.dateOfBirth=response.data.dateOfBirth;
                                    this.user.role=response.data.role;
                                    this.manager.sportsCenterTitle = response.data.SportCenterTitle;
                                    this.resetEditFields();
                                });
                        break;
                    case "COACH":
                        axios.get('rest/getCoach',{
                            params:{
                                username: String(this.$router.app.username)
                            }
                        })
                            .then(response=>{this.user.userName = response.data.userName;
                                    this.user.name = response.data.name;
                                    this.user.gender=response.data.gender;
                                    this.user.dateOfBirth=response.data.dateOfBirth;
                                    this.user.role=response.data.role;
                                    this.coach.pastTrainings = response.data.pastTrainings;
                                    this.resetEditFields();
                                });
                        break;
                    case "CUSTOMER":
                        axios.get('rest/getCustomer',{
                            params:{
                                username: String(this.$router.app.username)
                            }
                        })
                            .then(response=>{this.user.userName = response.data.userName;
                                    this.user.name = response.data.name;
                                    this.user.gender=response.data.gender;
                                    this.user.dateOfBirth=response.data.dateOfBirth;
                                    this.user.role=response.data.role;
                                    this.customer.membershipCost = response.data.membershipCost;
                                    this.customer.visitedCenters = response.data.visitedCenters;
                                    this.customer.loyalityPoints = response.data.loyalityPoints;
                                    this.customer.type = response.data.type;
                                    this.resetEditFields();
                                });
                        break;
                }
            }
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
        resetEditFields: function(){
            this.copyUser();
            this.editManager = this.manager;
            this.editCoach = this.coach;
            this.editCustomer = this.customer;
        },
        cancelEdit: function(){
            this.edit=0;
            this.resetEditFields();
        },
        copyUser: function(){
            /* user:{userName:"",password:"",name:"",gender:"",dateOfBirth:"",role:""},*/ 
            this.editUser.userName = this.user.userName;
            this.editUser.name = this.user.name;
            this.editUser.gender = this.user.gender;
            this.editUser.dateOfBirth = this.user.dateOfBirth;
            this.editUser.role = this.user.role;
        }
    }
});