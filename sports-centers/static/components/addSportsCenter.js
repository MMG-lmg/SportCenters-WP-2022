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
            longitude:0
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
            <option value="center">Sportski centar</option>
            <option value="gym">Teretana</option>
            <option value="pool">Bazen</option>
            <option value="dance">Plesni studio</option>
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

    </div>
    `,
    mounted(){

    },
    methods:{
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