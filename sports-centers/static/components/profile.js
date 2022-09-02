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
            filteredPastTrainings:null,
            filteredFutureTrainings:null,
            centerSearch:'',
            dateSearch:['',''],
            priceSearch:[0,999999],
            sortCenter:0,
            sortPrice:0,
            sortDate:0,
            typeSearch:"",
            typeTrainingSearch:"",
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
        <button v-if="this.$router.app.login=='CUSTOMER' || this.$router.app.login=='COACH'" v-on:click=resetSearch>Ponisti pretragu</button>
        <div>
            <h3>Filteri</h3>
            <label for="center">Tip Centra</label> 
            <select  name="center" ref="typeCombo" v-model="typeSearch" @change="filterByType">
                <option disabled value="">Svi</option>
                <option value="center">Sportski centar</option>
                <option value="gym">Teretana</option>
                <option value="pool">Bazen</option>
                <option value="dance">Plesni studio</option>
            </select>
            <label for="type">Tip Treninga</label> 
            <select  name="type" ref="typeTrainingCombo" v-model="typeTrainingSearch" @change="filterByTrainingType">
                <option disabled value="">Svi</option>
                <option value="personal">Personalni</option>
                <option value="group">Grupni</option>
            </select>
        </div>
        <div v-if="this.$router.app.login=='CUSTOMER'">
            <p>Cena clanarine: {{customer.membershipCost}}</p>
            <p>Poeni lojalnosti(bodovi): {{customer.loyalityPoints}}</p>
            <p>Tip kupca: {{customer.type}}</p>
            <h3 v-if="customer.visitedCenters==null">Niste posetili ni jedan sportski centar</h3>
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
            
            <table v-if="customerPastTrainings.length!=0">
                <tr>
                    <th>Naziv traninga</th>
                    <th>
                        <p @click="sortByCenter">Naziv centra</p> <br>
                        <input type="text" v-model="centerSearch" v-on:keyup="searchByCenter">
                    </th>
                    <th>
                        <p @click="sortByDate">Datum treninga</p> <br>
                        <input ref="dateInput0" type="date" v-model="dateSearch[0]" @change="searchByDate">
                        <input ref="dateInput1" type="date" v-model="dateSearch[1]" @change="searchByDate">
                    </th>
                    <th>
                        <p @click="sortByPrice">Cena treninga</p>
                        <input ref="priceInput0" type="number" v-model="priceSearch[0]" @change="searchByPrice">
                        <input ref="priceInput1" type="number" v-model="priceSearch[1]" @change="searchByPrice">   
                    </th>
                </tr>
                <tr v-for="history in filteredPastTrainings">
                    <td>{{history.training.title}}</td>
                    <td>{{history.training.center.centerTitle}}</td>
                    <td><pre>{{dateReformater(history.date)}}</pre></td>
                    <td v-if="history.training.price===0">Trening nema doplatu.</td>
                    <td v-if="history.training.price!=0">{{history.training.price}}</td>
                </tr>
            </table>

            <h3 v-if="customerFutureTrainings.length===0">Nemate zakazanih treninga</h3>
            <h3 v-if="customerFutureTrainings.length!=0">Zakazani treninzi</h3>
            
            <table v-if="customerFutureTrainings.length!=0">
                <tr>
                    <th>Naziv traninga</th>
                    <th>Naziv centra</th>
                    <th>Datum treninga</th>
                    <th>Cena treninga</th>
                </tr>
                <tr v-for="history in filteredFutureTrainings">
                    <td>{{history.training.title}}</td>
                    <td>{{history.training.center.centerTitle}}</td>
                    <td><pre>{{dateReformater(history.date)}}</pre></td>
                    <td v-if="history.training.price===0">Trening nema doplatu.</td>
                    <td v-if="history.training.price!=0">{{history.training.price}}</td>
                </tr>
            </table>
        </div>

        <div v-if="this.$router.app.login=='COACH'">
            <h3 v-if="coachPastTrainings.length===0">Nemate prethodnih treninga</h3>
            <h3 v-if="coachPastTrainings.length!=0">Prethodni treninzi</h3>
            <table v-if="coachPastTrainings.length!=0">
                <tr>
                    <th>Naziv traninga</th>
                    <th>
                        <p>Naziv centra</p>
                        <input type="text" v-model="centerSearch" v-on:keyup="searchByCenter">
                    </th>
                <th>
                    <p>Datum treninga</p> <br>
                    <input type="date" v-model="dateSearch[0]" @change="searchByDate">
                    <input type="date" v-model="dateSearch[1]" @change="searchByDate">
                </th>
                <th>
                    <p>Cena treninga</p>
                    <input type="number" v-model="priceSearch[0]" @change="searchByPrice">
                    <input type="number" v-model="priceSearch[1]" @change="searchByPrice">   
                </th>
                </tr>
                <tr v-for="history in filteredPastTrainings">
                    <td>{{history.training.title}}</td>
                    <td>{{history.training.center.centerTitle}}</td>
                    <td><pre>{{dateReformater(history.date)}}</pre></td>
                    <td v-if="history.training.price===0">Trening nema doplatu.</td>
                    <td v-if="history.training.price!=0">{{history.training.price}}</td>
                </tr>
            </table>

            <h3 v-if="coachFutureTrainings.length===0">Nemate zakazanih treninga</h3>
            <h3 v-if="coachFutureTrainings.length!=0">Zakazani treninzi</h3>
            <table v-if="coachFutureTrainings.length!=0" >
                <tr>
                    <th>Naziv traninga</th>
                    <th>Naziv centra</th>
                    <th>Datum treninga</th>
                    <th>Cena treninga</th>
                </tr>
                <tr v-for="history in filteredFutureTrainings">
                    <td>{{history.training.title}}</td>
                    <td>{{history.training.center.centerTitle}}</td>
                    <td><pre>{{dateReformater(history.date)}}</pre></td>
                    <td v-if="history.training.price===0">Trening nema doplatu.</td>
                    <td v-if="history.training.price!=0">{{history.training.price}}</td>
                </tr>
            </table>
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
                            //this.customerPastTrainings.push(item);
                        }
                        else{
                            this.customerFutureTrainings.push(item);
                        }
                    })
                    this.filteredFutureTrainings = this.customerFutureTrainings;
                }
            )
            axios.get('rest/getHistoryCustomerDate',{
                params:{
                    username:this.$router.app.username
                }
            })
            .then(
                response=>{
                    if(response.data !=null || response.data!="FAILIURE"){
                        this.customerPastTrainings = response.data;
                        this.filteredPastTrainings = this.customerPastTrainings;
                    }  
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
                    });
                    this.filteredPastTrainings =  this.coachPastTrainings;
                    this.coachFutureTrainings = this.coachFutureTrainings;
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
        trainingTypeToString: function(type){
            switch(type){
                case "GROUP":
                    return "Grupni trening";
                case "PERSONAL":
                    return "Personalni trening";
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
        cancelTraining:function(trainingHistory){        
            if(this.canTrainingBeModified(trainingHistory)){
                axios.post("rest/cancelTraining", trainingHistory.HistoryId)
                .then(res=>{
                    if(res.data==="FAILIURE"){
                        this.feedback="Otkazivanje treninga neuspesno!";
                    }
                    else{
                        this.feedback="Trening uspesno otkazan";
                        setTimeout(() => {  router.push(`/`) }, 1500);
                    }
                });
            }
            else{
                this.feedback="Trening nije moguce otkazati, neophodno je otkazati najmanje 2 dana pre pocetka";
            }
            
        },
        trainingDateAnalizer: function(training){
            if(this.trainingDateConverter(training) < new Date()){
                return "PAST";
            }
            else{
                return "FUTURE";
            }
        },
        basicDateConverter: function(stringDate){
            var dateData = stringDate.split("-");
            return new Date(dateData[0],dateData[1]-1,dateData[2],0,0,0,0);
        },
        trainingDateConverter: function(training){
            var currentDateDate = training.date.split("T")[0].split("-");
            var currentDateTime = training.date.split("T")[1].split(":");
            return new Date(currentDateDate[0],currentDateDate[1]-1,currentDateDate[2],currentDateTime[0],currentDateTime[1],0,0);
        },
        canTrainingBeModified: function(training){
            var trainingDate = this.trainingDateConverter(training);
            trainingDate.setDate(trainingDate.getDate()-2);
            if(new Date() < trainingDate){
                return true;
            }
            return false;
        },
        dateReformater: function(dateString){
            var date = dateString.split("T");
            return date[0] + "\n" + date[1];
        },
        dateComparatorBetween:function(date,dateRange){
            if(date > dateRange[0] && date < dateRange[1]){
                return true;
            }
            return false;
        },
        searchByCenter:function(){
            if(this.centerSearch!=''){
                if(this.$router.app.login ==="CUSTOMER"){
                    this.filteredPastTrainings = this.customerPastTrainings.filter(item =>
                        item.training.center.centerTitle.toLowerCase().includes(this.centerSearch.toLowerCase())
                    );
                    this.filteredFutureTrainings = this.customerFutureTrainings.filter(item =>
                        item.training.center.centerTitle.toLowerCase().includes(this.centerSearch.toLowerCase())
                    );
                }
                else{
                    this.filteredPastTrainings = this.coachPastTrainings.filter(item =>
                        item.training.center.centerTitle.toLowerCase().includes(this.centerSearch.toLowerCase())
                    );
                    this.filteredFutureTrainings = this.coachFutureTrainings.filter(item =>
                        item.training.center.centerTitle.toLowerCase().includes(this.centerSearch.toLowerCase())
                    );
                }
            }
        },
        searchByPrice:function(){
            if(this.priceSearch[0]!=null && this.priceSearch[1]!=null){
                if(this.$router.app.login ==="CUSTOMER"){
                    this.filteredPastTrainings = this.customerPastTrainings.filter(item =>
                        item.training.price >= this.priceSearch[0] && item.training.price <= this.priceSearch[1]);   
                    this.filteredFutureTrainings = this.customerFutureTrainings.filter(item =>
                        item.training.price >= this.priceSearch[0] && item.training.price <= this.priceSearch[1]); 
                }
                else{
                    this.filteredPastTrainings = this.coachPastTrainings.filter(item =>
                        item.training.price >= this.priceSearch[0] && item.training.price <= this.priceSearch[1]);   
                    this.filteredFutureTrainings = this.coachFutureTrainings.filter(item =>
                        item.training.price >= this.priceSearch[0] && item.training.price <= this.priceSearch[1]); 
                }
                  
            }
        },
        searchByDate:function(){
            if(this.dateSearch[0]!='' && this.dateSearch[1]!=''){
                if(this.$router.app.login ==="CUSTOMER"){
                    this.filteredPastTrainings = this.customerPastTrainings.filter(item =>
                        this.dateComparatorBetween(this.trainingDateConverter(item),[this.basicDateConverter(this.dateSearch[0]), this.basicDateConverter(this.dateSearch[1])]));
                    this.filteredFutureTrainings = this.customerFutureTrainings.filter(item =>
                        this.dateComparatorBetween(this.trainingDateConverter(item),[this.basicDateConverter(this.dateSearch[0]), this.basicDateConverter(this.dateSearch[1])]));
                }
                else{
                    this.filteredPastTrainings = this.coachPastTrainings.filter(item =>
                        this.dateComparatorBetween(this.trainingDateConverter(item),[this.basicDateConverter(this.dateSearch[0]), this.basicDateConverter(this.dateSearch[1])]));
                    this.filteredFutureTrainings = this.coachFutureTrainings.filter(item =>
                        this.dateComparatorBetween(this.trainingDateConverter(item),[this.basicDateConverter(this.dateSearch[0]), this.basicDateConverter(this.dateSearch[1])]));
                }
            }
        },
        sortByCenter: function(){
            if(!this.sortCenter){
                this.sortByCenterAsc();
                this.sortCenter = 1;
            }
            else{
                this.sortByCenterDesc();
                this.sortCenter = 0;
            }
        },
        sortByCenterAsc: function(){
            function compare(a,b){
                if(a.training.center.centerTitle.toLowerCase() < b.training.center.centerTitle.toLowerCase())
                    return -1;
                if(a.training.center.centerTitle.toLowerCase() > b.training.center.centerTitle.toLowerCase())
                    return 1;
                return 0;
            }
            this.filteredPastTrainings.sort(compare);
            this.filteredFutureTrainings.sort(compare);
        },
        sortByCenterDesc: function(){
            function compare(a,b){
                if(a.training.center.centerTitle.toLowerCase() < b.training.center.centerTitle.toLowerCase())
                    return 1;
                if(a.training.center.centerTitle.toLowerCase() > b.training.center.centerTitle.toLowerCase())
                    return -1;
                return 0;
            }
            this.filteredPastTrainings.sort(compare);
            this.filteredFutureTrainings.sort(compare);
        },
        sortByPrice:function(){
            if(!this.sortPrice){
                this.sortByPriceAsc();
                this.sortPrice = 1;
            }
            else{
                this.sortByPriceDesc();
                this.sortPrice = 0;
            }
        },
        sortByPriceAsc:function(){
            function compare(a,b){
                if(a.training.price <  b.training.price )
                    return -1;
                if(a.training.price >  b.training.price )
                    return 1;
                return 0;
            }
            this.filteredPastTrainings.sort(compare);
            this.filteredFutureTrainings.sort(compare);
        },
        sortByPriceDesc:function(){
            function compare(a,b){
                if(a.training.price <  b.training.price )
                    return 1;
                if(a.training.price >  b.training.price )
                    return -1;
                return 0;
            }
            this.filteredPastTrainings.sort(compare);
            this.filteredFutureTrainings.sort(compare);
        },
        sortByDate:function(){
            if(!this.sortDate){
                this.sortByDateAsc();
                this.sortDate = 1;
            }
            else{
                this.sortByDateDesc();
                this.sortDate = 0;
            }
        },
        sortByDateAsc:function(){
            trainingDateConverter = this.trainingDateConverter;
            function compare(a,b){
                if(trainingDateConverter(a) <  trainingDateConverter(b))
                    return -1;
                if(trainingDateConverter(a) >  trainingDateConverter(b))
                    return 1;
                return 0;
            }
            this.filteredPastTrainings.sort(compare);
            this.filteredFutureTrainings.sort(compare);
        },
        sortByDateDesc:function(){
            trainingDateConverter = this.trainingDateConverter;
            function compare(a,b){
                if(trainingDateConverter(a) <  trainingDateConverter(b))
                    return 1;
                if(trainingDateConverter(a) >  trainingDateConverter(b))
                    return -1;
                return 0;
            }
            this.filteredPastTrainings.sort(compare);
            this.filteredFutureTrainings.sort(compare);
        },
        filterByType: function(){
            if(this.$router.app.login ==="CUSTOMER"){
                if(this.typeSearch === "center"){
                    this.filteredPastTrainings = this.customerPastTrainings.filter(item => item.training.center.type === "SPORTS_CENTER");
                    this.filteredFutureTrainings = this.customerFutureTrainings.filter(item => item.training.center.type === "SPORTS_CENTER");
                }
                else if(this.typeSearch === "gym"){
                    this.filteredPastTrainings = this.customerPastTrainings.filter(item => item.training.center.type === "GYM");
                    this.filteredFutureTrainings = this.customerFutureTrainings.filter(item => item.training.center.type === "GYM");
                }
                else if(this.typeSearch === "pool"){
                    this.filteredPastTrainings = this.customerPastTrainings.filter(item => item.training.center.type === "POOL");
                    this.filteredFutureTrainings = this.customerFutureTrainings.filter(item => item.training.center.type === "POOL");
                }
                else if(this.typeSearch === "dance"){
                    this.filteredPastTrainings = this.customerPastTrainings.filter(item => item.training.center.type === "DANCE_STUDIO");
                    this.filteredFutureTrainings = this.customerFutureTrainings.filter(item => item.training.center.type === "DANCE_STUDIO");
                }
            }
            else{
                if(this.typeSearch === "center"){
                    this.filteredPastTrainings = this.coachPastTrainings.filter(item => item.training.center.type === "SPORTS_CENTER");
                    this.filteredFutureTrainings = this.coachFutureTrainings.filter(item => item.training.center.type === "SPORTS_CENTER");
                }
                else if(this.typeSearch === "gym"){
                    this.filteredPastTrainings = this.coachPastTrainings.filter(item => item.training.center.type === "GYM");
                    this.filteredFutureTrainings = this.coachFutureTrainings.filter(item => item.training.center.type === "GYM");
                }
                else if(this.typeSearch === "pool"){
                    this.filteredPastTrainings = this.coachPastTrainings.filter(item => item.training.center.type === "POOL");
                    this.filteredFutureTrainings = this.coachFutureTrainings.filter(item => item.training.center.type === "POOL");
                }
                else if(this.typeSearch === "dance"){
                    this.filteredPastTrainings = this.coachPastTrainings.filter(item => item.training.center.type === "DANCE_STUDIO");
                    this.filteredFutureTrainings = this.coachFutureTrainings.filter(item => item.training.center.type === "DANCE_STUDIO");
                }
            }
			
        },
        filterByTrainingType: function(){
            if(this.$router.app.login ==="CUSTOMER"){
                if(this.typeTrainingSearch === "personal"){
                    this.filteredPastTrainings = this.customerPastTrainings.filter(item => item.training.type === "PERSONAL");
                    this.filteredFutureTrainings = this.customerFutureTrainings.filter(item => item.training.type === "PERSONAL");
                }
                else if(this.typeTrainingSearch === "group"){
                    this.filteredPastTrainings = this.customerPastTrainings.filter(item => item.training.type === "GROUP");
                    this.filteredFutureTrainings = this.customerFutureTrainings.filter(item => item.training.center.type === "GROUP");
                }
            }
            else{
                if(this.typeTrainingSearch === "personal"){
                    this.filteredPastTrainings = this.coachPastTrainings.filter(item => item.training.type === "PERSONAL");
                    this.filteredFutureTrainings = this.coachFutureTrainings.filter(item => item.training.type === "PERSONAL");
                }
                else if(this.typeTrainingSearch === "group"){
                    this.filteredPastTrainings = this.coachPastTrainings.filter(item => item.training.type === "GROUP");
                    this.filteredFutureTrainings = this.coachFutureTrainings.filter(item => item.training.center.type === "GROUP");
                }
            }
        },
        resetSearch: function(){
            this.centerSearch='';
            this.dateSearch =['',''];
            this.priceSearch =[0,999999];
            this.$refs.typeCombo.value="";
            this.$refs.typeTrainingCombo.value="";
            this.typeSearch="";
            this.typeTrainingSearch="";
            if(this.$router.app.login ==="CUSTOMER"){
                this.filteredPastTrainings = this.customerPastTrainings;
                this.filteredFutureTrainings = this.customerFutureTrainings;
            }
            else{
                this.filteredPastTrainings = this.coachPastTrainings;
                this.filteredFutureTrainings = this.coachFutureTrainings;
            }
        }
    }
});