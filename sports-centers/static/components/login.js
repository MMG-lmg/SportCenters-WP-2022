Vue.component("login",{
    data: function(){
        return {
            username:"",
            password:"",
            error:""
        }
    },
    template:`
        <div>
            <h3>Prijava</h3>
            <form>
                <label for="username">Korisnicko ime:</label><br>
                <input type="text" v-model="username" name="username"><br>
                <label for="password">Lozinka:</label><br>
                <input type="password" v-model="password" name="password">
                <button v-on:click="login">Prijava</button>
            </form>
            <p>{{error}}</p>
        </div>
    `,
    mounted() {
        
    },
    methods:{
        login: function(event){
            event.preventDefault();
            console.log("aaaa");
            if(this.username.trim() != "" && this.password.trim() != ""){
                axios.post("rest/login", {username: this.username,password: this.password})
                .then(res => {
                    console.log(res.data);
                });
            }
            else{
                this.error ="ne moze biti prazno";
            }
            
        },
    }
});
