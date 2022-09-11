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
            <div class="d-flex flex-column align-items-center justify-content-center mt-5">
                <h3>Prijava</h3>
                <form>
                    <div class=" input-group mt-2">	
						<span class="input-group-text">Korisnicko ime:</span>
						<input class="form-control" type="text" v-model="customer.userName" name="username"></input>
                    </div>

                    <div class=" input-group mt-2">	
						<span class="input-group-text">Ime:</span>
						<input class="form-control" type="text" v-model="customer.name" name="name"></input>
                    </div>

                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Lozinka:</span>
                        <input class="form-control" type="password" v-model="customer.password" name="password"></input>
                    </div> 

                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Ponoviti lozinku:</span>
                        <input class="form-control" type="password" v-model="passwordCheck" name="passwordCheck"></input>
                    </div> 

                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Pol:</span>
                        <select class="form-select" ref="genderCombo" v-model="customer.gender" name="gender">
                                <option value="MALE" selected>Muski</option>
                                <option value="FEMALE">Zenski</option>
                        </select>
                    </div>

                    <div class=" input-group mt-2">	
                        <span class="input-group-text">Datum rodjenja:</span>
                        <input class="form-control" type="date" v-model="customer.dateOfBirth" name="date"></input>
                    </div> 

                    <button class="btn btn-primary button-green mt-2" v-on:click="register">Registracija</button>
                </form>

                <div v-if="error" class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                    <p>{{error}}</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div v-if="feedbackPopup" class="alert alert-success mt-2" role="alert">
                    <p> Korisnik {{customer.username}} uspesno dodat</p>
                </div>
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