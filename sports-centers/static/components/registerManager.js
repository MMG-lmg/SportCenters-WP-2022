Vue.component("registerManager",{
    data: function(){
        return{
            manager:{userName: '',password:'',name:'',gender:"",dateOfBirth:"",role:"MENAGER", SportCenterTitle:null},
            passwordCheck:'',
            error:"",
            passFlag:true,
            emptyFlag:true,
            feedbackPopup:false,
            availableCenters:null,
        }
    },
    template:`
    <div>
        <h3>Prijava menadzera</h3>
        <form>
            <label for="username">Korisnicko ime:</label><br>
            <input type="text" v-model="manager.userName" name="username"><br>

            <label for="name">Ime:</label><br>
            <input type="text" v-model="manager.name" name="name"><br>

            <label for="password">Lozinka:</label><br>
            <input type="password" v-model="manager.password" name="password"><br>

            <label for="passwordCheck">Ponoviti lozinku:</label><br>
            <input type="password" v-model="passwordCheck" name="passwordCheck"><br>

            <label for="gender">Pol:</label><br>
            <select ref="genderCombo" v-model="manager.gender" name="gender">
                    <option value="MALE" selected>Muski</option>
                    <option value="FEMALE">Zenski</option>
            </select><br>
            
            <label for="date">Datum rodjenja:</label><br>
            <input type="date" v-model="manager.dateOfBirth" name="date"><br>

            <select v-model="manager.SportCenterTitle">
                <option value="null" selected>NEMA</option>
                <option v-for="item in availableCenters">
                    {{item}}
                </option>
            </select>

            <button v-on:click="register">Registracija</button>
        </form>
        <p>{{error}}</p>
        <div v-if="feedbackPopup">
            <p> Korisnik {{manager.username}} uspesno dodat</p>
        </div>
    </div>
    `,
    mounted() { 
        axios.get("rest/centers/free").then(response=>{this.availableCenters = response.data});
    },
    methods:{
        passwordMatch: function(){
            if(this.passwordCheck === this.manager.password){
                this.passFlag = false;
            }
            else{
                this.passFlag = true;
                this.error = "Lozinke nisu iste";
            }
        },
        emptyFields: function(){
            if(this.manager.userName!=='' && this.manager.name!=='' && this.manager.password!=='' && this.manager.gender!== null && this.manager.dateOfBirth!== null){
                this.emptyFlag = false;
            }
            else{
                this.emptyFlag = true;
                this.error = "Neophodno je popuniti sva polja";
            }
        },
        register: function(event){
            event.preventDefault();
            console.log("aa");
            this.passwordMatch();
            this.emptyFields();
            if(this.passFlag === false && this.emptyFlag === false){
                console.log(this.manager);
                axios.post("rest/addManager", this.manager)
                .then(res =>{
                    if(res.data ==="FAILIURE"){
                        //TODO when validation gets implemented on back
                    }
                    else{
                        this.feedbackPopup = true;
                        setTimeout(() => {  router.push(`/`) }, 5000);
                    }
                });
            }
        }
    }
});