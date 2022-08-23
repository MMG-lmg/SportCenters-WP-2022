Vue.component("membershipOffers",{
    data:function(){
        return{
            listedOffers:null,
            add:false,
            feedback:"",
            /*this.description = description;
            this.type = type;
            this.price = price;
            this.dailyVisits = dailyVisits;*/
            newOffer:{membershipOfferId:"",description:"",type:null,price:0.0,numOfVisits:0},
        }
    },
    template:`
        <div>
            <p>{{feedback}}</p>
            <h3>Postojece ponude</h3>
            <div v-if="listedOffers" v-for="offer in listedOffers">
                <p>{{offer.membershipOfferId}}</p>
                <p>Opis:{{offer.description}}</p>
                <p>{{offer.type}},Broj poseta:{{offer.numOfVisits}}</p>
                <p>Cena:{{offer.price}}</p>
            </div>
            <button v-if="add==false" @click="add=true">Dodavanje ponude</button>
            <div v-if="add==true">
                <label for="desc">Opis:</label>
                <input type="text" name="desc" v-model="newOffer.description"/>
                <label for="type">Tip:</label>
                <select name="type" v-model="newOffer.type">
                    <option value="ANNUAL">Godisnja</option>
                    <option value="MONTHLY">Mesecna</option>
                    <option value="WEEKLY">Nedeljna</option>
                </select>
                <label for="price">Cena:</label>
                <input type="number" name="price" v-model="newOffer.price"/>
                <label for="visits">Broj poseta:</label>
                <input type="number" name="visits" v-model="newOffer.numOfVisits"/>
                <button @click="this.addOffer">Dodaj</button>
                <button @click="this.cancelAdd">Odustani</button>
            </div>
        </div>
    `,
    mounted(){
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

        axios.get('rest/Membership/Offers/getAll')
        .then(response=>{
            if(response.data!="FAILIURE"){
                this.listedOffers = response.data;
            }
            else{
                this.feedback="Nema ponuda, sto ne bi dodali neku?";
            }
        });
    },
    methods:{
        addOffer: function(){
            axios.post('rest/Membership/Offers/add',this.newOffer)
            .then(res=>{
                if(res.data==="FAILIURE"){
                    this.feedback="Greska, dodavanje Neuspesno!";
                }
                else{
                    this.feedback="Uspesno dodata ponuda";
                    this.clearOffer();
                    setTimeout(() => {  router.push(`/`) }, 1500);
                }
            });
        },
        cancelAdd:function(){
            this.clearOffer();
            this.add=false;
        },
        clearOffer:function(){
            this.newOffer.description="";
            this.newOffer.type=null;
            this.newOffer.price=0.0;
            this.newOffer.numOfVisits=0;
        }
    }
});