Vue.component("register",{
    data: function(){
        return{
            /*String userName, String password, String name, Gender gender, LocalDate dateOfBirth, UserRole role,
            double membershipCost, List<SportsCenter> visitedCenters, double loyalityPoints, CustomerType type)*/
            customer:{userName: '',password:'',name:'',gender:"",dateOfBirth:"",role:"CUSTOMER", membershipCost:0,visitedCenters:null,loyalityPoints: 0, type:null},
            passwordCheck:'',
            error:"",
            passFlag:true,
            emptyFlag:true,
            feedbackPopup:false
        }
    },
    template:`
        <div>
            <h3>Prijava</h3>
            <form>
                <label for="username">Korisnicko ime:</label><br>
                <input type="text" v-model="customer.userName" name="username"><br>

                <label for="name">Ime:</label><br>
                <input type="text" v-model="customer.name" name="name"><br>

                <label for="password">Lozinka:</label><br>
                <input type="password" v-model="customer.password" name="password"><br>

                <label for="passwordCheck">Ponoviti lozinku:</label><br>
                <input type="password" v-model="passwordCheck" name="passwordCheck"><br>

                <label for="gender">Pol:</label><br>
                <select ref="genderCombo" v-model="customer.gender" name="gender">
						<option value="MALE" selected>Muski</option>
						<option value="FEMALE">Zenski</option>
                </select><br>
                
                <label for="date">Datum rodjenja:</label><br>
                <input type="date" v-model="customer.dateOfBirth" name="date"><br>

                <button v-on:click="register">Registracija</button>
            </form>
            <p>{{error}}</p>
            <div v-if="feedbackPopup">
                <p> Korisnik {{customer.username}} uspesno dodat</p>
            </div>
        </div>
    `,
    mounted() {
        
    },
    methods:{
        passwordMatch: function(){
            if(this.passwordCheck === this.customer.password){
                this.passFlag = false;
            }
            else{
                this.passFlag = true;
                this.error = "Lozinke nisu iste";
            }
        },
        emptyFields: function(){
            if(this.customer.userName!=='' && this.customer.name!=='' && this.customer.password!=='' && this.customer.gender!== null && this.customer.dateOfBirth!== null){
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
                console.log(this.customer);
                axios.post("rest/addCustomer", this.customer)
                .then(res =>{
                    if(res.data ==="FAILIURE"){
                        this.error = "Registracija neuspesna";
                    }
                    if(res.data ==="FAILIURE_USERNAME"){
                        this.error = "Korisnicko ime vec postoji molimo odaberite novo";
                        return;
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