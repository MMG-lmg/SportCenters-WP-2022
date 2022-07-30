Vue.component("addCenter",{
    data:function(){
        return{
            centerTitle:"",
            type:"",
            image:null,
            workHoursStart:null,
            workHoursEnd:null,
            street :"",
            streetNumber :"",
            city :"",
            zipCode :"",
            latitude:0,
            longitude:0,
            error:""
        }
    },
    template:`
    <div>
        <h3>Unos novog spotskog centra</h3>
        <p>{{error}}</p>
        <label for="title">Naziv sportskog centra</label>
        <input type="text" name="title" v-model="centerTitle"></input>
        <br>
        <label for="type">Tip</label> 
        <select name="type" v-model="type">
            <option value="SPORTS_CENTER">Sportski centar</option>
            <option value="GYM">Teretana</option>
            <option value="POOL">Bazen</option>
            <option value="DANCE_STUDIO">Plesni studio</option>
        </select>
        <br>
        <label for="logo">Logo sporskog centra </label>
        <input type="file" name="logo" ref="imgUpload" @change="onFileInput($event)"></input>
        <button @click="removeImage">Ukloni logo</button>
        <img :src="image"></img>
        <br>
        <label for="timeStart">Radno vreme</label>
        <input type="number" name="timeStart" min="0" max="24" v-model="workHoursStart"></input>
        
        <input type="number" name="timeEnd" min="0" max="24" v-model="workHoursEnd"></input>

        <p>Adresa</p>
        <p>Koordinate</p>
        <input type="number" v-model="latitude"></input>
        <input type="number" v-model="longitude"></input>
        <br>
        <label for="street">Ulica</label>
        <input type="text" name="street" v-model="street"></input>

        <label for="sNumber">Broj</label>
        <input type="text" name="sNumber" v-model="streetNumber"></input>

        <label for="city">Grad</label>
        <input type="text" name="city" v-model="city"></input>

        <label for="zip">Postanski broj</label>
        <input type="number" name="zip" v-model="zipCode"></input>

        <button v-if="checkData" @click="addCenter">Dodaj centar</button>
    </div>
    `,
    mounted(){

    },
    methods:{
        addCenter(){
            if(this.checkData){
                var SportsCenter = {centerId: 0, centerTitle: this.centerTitle, type: this.type, status:"CLOSED",
                 location:{ latitude: this.latitude, longitude: this.longitude, address: {street: this.street, streetNumber: this.streetNumber, city:this.city, zipCode:this.zipCode}},
                 logoPath: this.image.split(",")[1], grade: 0, workHours:[this.workHoursStart, this.workHoursEnd]
                };
                console.log(SportsCenter);
                axios.post("rest/centers/add", SportsCenter)
                .then(res=>{
                    if(res.data==="FAILIURE"){
                        this.feedback="Greska dodavanje centra, neuspesno!";
                    }
                    else{
                        this.feedback="Centar uspesno dodat";
                        setTimeout(() => {  router.push(`/`) }, 5000);
                    }
                });
            }
            else{
                this.error="Sva polja moraju biti popunjena";
            }

        },
        checkData(){
            if(centerTitle===null || centerTitle==="",
                type===null || type==="",
                image===null || image==="",
                workHoursStart===null || workHoursStart==="",
                workHoursEnd===null || workHoursEnd==="",
                centerTitle===null || centerTitle==="",
                streetNumber===null || streetNumber==="",
                street===null || street==="",
                city===null || city==="", 
                zipCode===null || zipCode==="",
                latitude===null || latitude===0,
                longitude===null || longitude===0)
            {
                return false;
            }
            else{
                return true;
            }
        },
        onFileInput(e){
            var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
            var files = e.target.files;
            if(!files.length){
                return;
            }
            var fileExtension = (files[0].name).match(patternFileExtension)[1];
            if(fileExtension=="png" || fileExtension=="jpg" || fileExtension=="jpeg" || fileExtension=="gif"){
                this.createImage(files[0]);
            }
            else{
                alert("odabrani file mora biti slika");
                this.removeImage();
            }
        },
        createImage(file){
            var reader = new FileReader();

            reader.onload = (e) =>{
                this.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage(){
            this.image="";
            this.$refs.imgUpload.value = null;
        }
    }
});