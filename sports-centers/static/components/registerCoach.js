Vue.component("registerCoach",{
    data: function(){
        return{
            coach:{userName: '',password:'',name:'',gender:"",dateOfBirth:"",role:"COACH", pastTrainings:null},
            passwordCheck:'',
            error:"",
            passFlag:true,
            emptyFlag:true,
            feedbackPopup:false,
            error:""
        }
    },
    template:`
    <div>
        <h3>Prijava</h3>
        <p>{{error}}</p>
        <form>
            <label for="username">Korisnicko ime:</label><br>
            <input type="text" v-model="coach.userName" name="username"><br>

            <label for="name">Ime:</label><br>
            <input type="text" v-model="coach.name" name="name"><br>

            <label for="password">Lozinka:</label><br>
            <input type="password" v-model="coach.password" name="password"><br>

            <label for="passwordCheck">Ponoviti lozinku:</label><br>
            <input type="password" v-model="passwordCheck" name="passwordCheck"><br>

            <label for="gender">Pol:</label><br>
            <select ref="genderCombo" v-model="coach.gender" name="gender">
                    <option value="MALE" selected>Muski</option>
                    <option value="FEMALE">Zenski</option>
            </select><br>
            
            <label for="date">Datum rodjenja:</label><br>
            <input type="date" v-model="coach.dateOfBirth" name="date"><br>

            <button v-on:click="register">Registracija</button>
        </form>
        <p>{{error}}</p>
        <div v-if="feedbackPopup">
            <p> Korisnik {{coach.username}} uspesno dodat</p>
        </div>
    </div>
    `,
    mounted() {
        axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){
                router.push(`/403`);
            }
            else{
				this.$router.app.username = response.data.userName;
                this.$router.app.login = response.data.role;
                if(this.$router.app.login!="ADMIN"){
                    router.push(`/403`);
                }
            }
        });
    },
    methods:{
        passwordMatch: function(){
            if(this.passwordCheck === this.coach.password){
                this.passFlag = false;
            }
            else{
                this.passFlag = true;
                this.error = "Lozinke nisu iste";
            }
        },
        emptyFields: function(){
            if(this.coach.userName!=='' && this.coach.name!=='' && this.coach.password!=='' && this.coach.gender!== null && this.coach.dateOfBirth!== null){
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
                console.log(this.coach);
                axios.post("rest/addCoach", this.coach)
                .then(res =>{
                    if(res.data ==="FAILIURE"){
                        this.error="Greska trener nije dodat";
                    }
                    if(res.data ==="FAILIURE_USERNAME"){
                        this.error="Korisnik sa postojecim korisnickim imenom postoji, odaberite drugo";
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