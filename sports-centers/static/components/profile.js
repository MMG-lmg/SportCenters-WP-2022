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
            feedback:"",
            customerPastTrainings:[],
            customerFutureTrainings:[],
            coachPastTrainings:[],
            coachFutureTrainings:[],
        }
    },
    template:`
    <div>
        <h3>Dobrodosli {{user.userName}}</h3>
        <p>{{feedback}}</p>
        <div>
        <label for="uName">Korisnicko ime:</label>
        <input type="text" name="uName" v-model="editUser.userName" disabled/>
        </div>
        <div>
        <label for="name">Ime:</label>
        <input type="text" name="name" v-model="editUser.name" :disabled="edit == 0"/>
        </div>
        <div>
        <label for="gender">Pol:</label>
        <select name="gender" v-model="editUser.gender" :disabled="edit == 0">
            <option :selected="editUser.gender=='MALE'" value="MALE">Muski</option>
            <option :selected="editUser.gender=='FEMALE'" value="FEMALE" >Zenski</option>
        </select>
        </div>
        <div>
        <label for="date">Datum rodjenja:</label>
        <input type="date" name="date" v-model="editUser.dateOfBirth" :disabled="edit == 0"/>
        </div>
        <div>
        <p>Uloga: {{roleToString(editUser.role)}}</p>
        </div>

        <button v-if="edit==0" @click="edit=1">Izmeni podatke</button>
        <button v-if="edit==1" @click="this.cancelEdit">Otkazi izmene</button>
        <button v-if="edit==1" @click="this.updateUser">Primeni izmene</button>

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
            <h3 v-if="customerPastTrainings.length===0">Nemate prethodno posecenih treninga</h3>
            <h3 v-if="customerPastTrainings.length!=0">Prethodno poseceni treninzi</h3>
            <div v-for="history in customerPastTrainings">
                <p>Naziv traninga: {{history.training.title}}</p>
                <p>Naziv centra:{{history.training.center.centerTitle}}</p>
                <p>Datum treninga:{{history.date}}</p>
            </div>

            <h3 v-if="customerFutureTrainings.length===0">Nemate zakazanih treninga</h3>
            <h3 v-if="customerFutureTrainings.length!=0">Zakazani treninzi</h3>
            <div v-for="history in customerFutureTrainings">
                <p>Naziv traninga: {{history.training.title}}</p>
                <p>Naziv centra:{{history.training.center.centerTitle}}</p>
                <p>Datum treninga:{{history.date}}</p>
            </div>
        </div>

        <div v-if="this.$router.app.login=='COACH'">
            <h3 v-if="coachPastTrainings.length===0">Nemate prethodnih treninga</h3>
            <h3 v-if="coachPastTrainings.length!=0">Prethodni treninzi</h3>
            <div v-for="history in coachPastTrainings">
                <p>Naziv traninga: {{history.training.title}}</p>
                <p>Naziv centra:{{history.training.center.centerTitle}}</p>
                <p>Datum treninga:{{history.date}}</p>
            </div>

            <h3 v-if="coachFutureTrainings.length===0">Nemate zakazanih treninga</h3>
            <h3 v-if="coachFutureTrainings.length!=0">Zakazani treninzi</h3>
            <div v-for="history in coachFutureTrainings">
                <p>Naziv traninga: {{history.training.title}}</p>
                <p>Naziv centra:{{history.training.center.centerTitle}}</p>
                <p>Datum treninga:{{history.date}}</p>
                <button @click="cancelTraining(history.HistoryId)"> otkazi trening </button>
            </div>
        </div>

    </div>
    `,
    mounted(){
        axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){
                router.push(`/403`);
            }
            else{
				console.log(response.data);
				this.$router.app.username = response.data.userName;
                this.$router.app.login = response.data.role;
                this.fillUserData();
                
            }
        });
        if(this.$router.app.login ==="CUSTOMER"){
            axios.get('rest/getHistoryCustomer',{
                params:{
                    username:this.$router.app.username
                }
            })
            .then(
                response=>{
                    response.data.forEach((item, index) =>{
                        var trainingDate = this.trainingDateAnalizer(item);
                        if(trainingDate === "PAST"){
                            this.customerPastTrainings.push(item);
                        }
                        else{
                            this.customerFutureTrainings.push(item);
                        }
                    })
                }
            )
        }
        if(this.$router.app.login ==="COACH"){
            axios.get('rest/getHistoryCoach',{
                params:{
                    username:this.$router.app.username
                }
            })
            .then(
                response=>{
                    response.data.forEach((item, index) =>{
                        var trainingDate = this.trainingDateAnalizer(item);
                        if(trainingDate === "PAST"){
                            this.coachPastTrainings.push(item);
                        }
                        else{
                            this.coachFutureTrainings.push(item);
                        }
                    })
                }
            )
        }
        
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
                            .then(response=>{
                                    console.log(response.data);
                                    this.user.userName = response.data.userName;
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
        },
        updateUser:function(){
            switch(this.$router.app.login){
                case "ADMIN":
                    this.updateAdmin();
                    break;
                case "CUSTOMER":
                    this.updateCustomer();
                    break;
                case "MENAGER":
                    this.updateManager();
                    break;
                case "COACH":
                    this.updateCoach();
            }
        },
        updateAdmin: function(){
            axios.post("rest/editAdmin",this.editUser)
            .then(res=>{
                if(res.data==="FAILIURE"){
                    this.feedback="Greska izmena podataka, neuspesna!";
                }
                else{
                    this.feedback="Podaci uspesno izmenjeni";
                    setTimeout(() => {  router.push(`/`) }, 5000);
                }
            });
        },
        updateCustomer: function(){
            var customerDTO = {userName:this.editUser.userName,password:this.editUser.password,name:this.editUser.name,
                gender:this.editUser.gender,dateOfBirth:this.editUser.dateOfBirth,role:this.editUser.role,
                membershipCost:this.editCustomer.membershipCost, visitedCenters:this.editCustomer.visitedCenters, loyalityPoints: this.editCustomer.loyalityPoints,type:this.editCustomer.type};
            axios.post("rest/editCustomer",customerDTO)
            .then(res=>{
                if(res.data==="FAILIURE"){
                    this.feedback="Greska izmena podataka, neuspesna!";
                }
                else{
                    this.feedback="Podaci uspesno izmenjeni";
                    setTimeout(() => {  router.push(`/`) }, 5000);
                }
            });

        },
        updateCoach: function(){
            var coachDTO = {userName:this.editUser.userName,password:this.editUser.password,name:this.editUser.name,
                gender:this.editUser.gender,dateOfBirth:this.editUser.dateOfBirth,role:this.editUser.role, pastTrainings:this.editCoach.pastTrainings};
            axios.post("rest/editCoach",coachDTO)
            .then(res=>{
                if(res.data==="FAILIURE"){
                    this.feedback="Greska izmena podataka, neuspesna!";
                }
                else{
                    this.feedback="Podaci uspesno izmenjeni";
                    setTimeout(() => {  router.push(`/`) }, 5000);
                }
            });
        },
        updateManager: function(){
            var managerDTO = {userName:this.editUser.userName,password:this.editUser.password,name:this.editUser.name,
                gender:this.editUser.gender,dateOfBirth:this.editUser.dateOfBirth,role:this.editUser.role,sportsCenterTitle:this.editManager.sportsCenterTitle};
                axios.post("rest/editManager",managerDTO)
                .then(res=>{
                    if(res.data==="FAILIURE"){
                        this.feedback="Greska izmena podataka, neuspesna!";
                    }
                    else{
                        this.feedback="Podaci uspesno izmenjeni";
                        setTimeout(() => {  router.push(`/`) }, 5000);
                    }
                });
        },
        cancelTraining:function(trainingHistoryId){
            axios.post("rest/cancelTraining", trainingHistoryId)
            .then(res=>{
                if(res.data==="FAILIURE"){
                    this.feedback="Otkazivanje treninga neuspesno!";
                }
                else{
                    this.feedback="Trening uspesno otkazan";
                    setTimeout(() => {  router.push(`/profile`) }, 1500);
                }
            });
        },
        trainingDateAnalizer: function(item){
            var currentDateDate = item.date.split("T")[0].split("-");
            var currentDateTime = item.date.split("T")[1].split(":");
            var currentDate = new Date(currentDateDate[0],currentDateDate[1]-1,currentDateDate[2],currentDateTime[0],currentDateTime[1],0,0);
            if(currentDate < new Date()){
                return "PAST";
            }
            else{
                return "FUTURE";
            }
        }
    }
});