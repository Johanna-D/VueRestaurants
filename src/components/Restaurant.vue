<template>
<div>
  <div id="details">
    

    <div id="description">
      <h1>
      Détail du restaurant {{ restaurant.name }}
    </h1>
      <img
        :src="selectedImage"
        alt="Photo du restaurant"
        style="max-height: 300px; max-width: 400px; border: 1px solid black"
      />
      <md-list>
        <md-list-item>
          <md-icon>assignment_ind</md-icon>
          <span class="md-list-item-text">{{ restaurant.name }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon>free_breakfast</md-icon>
          <span class="md-list-item-text">{{ restaurant.cuisine }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon>place</md-icon>
          <span class="md-list-item-text">{{ restaurant.borough }}</span>
        </md-list-item>

        <md-list-item>
          <router-link :to="'/menu' "
              ><md-button>Voir le menu</md-button></router-link
            >
        </md-list-item>
      </md-list>
    </div>

 



  <div id="map">
    <h1>Localisation</h1>
    
    <div style="height: 500px; width: 100%">
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker :lat-lng="withPopup">
          <l-popup>
            <div @click="innerClick">
              {{ restaurant.name }}
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
   </div>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
export default {
  name: "Restaurant",
  props: {},
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null,
      latitude: null,
      longitute: null,
      images: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
        "https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",
      ],
      selectedImage: null,
      zoom: 15,
      center: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: null,
      currentZoom: 11.5,
      currentCenter: null,
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    };
  },
  methods: {
    randomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
  },
  created() {
    this.selectedImage = this.randomItem(this.images);
  },
  mounted() {
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((reponse) => {
        return reponse.json();
      })
      .then((data) => {
        console.log(data.restaurant.name);
        this.restaurant = data.restaurant;
        this.longitute = data.restaurant.address.coord[1];
        this.latitude = data.restaurant.address.coord[0];
        this.center = latLng(this.longitute, this.latitude);
        this.withPopup = latLng(this.longitute, this.latitude);
        this.currentCenter = latLng(this.longitute, this.latitude);
      });
  },
};
/*
Vue.component('CarteRestaurant', {

})*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
template{
  width: 100%;
  height: 100%;
}

#details {
  /*background-color: white;*/
  padding: 10px;
  width: 90%;
  min-height: 100%;
  margin-top: 3%;
  margin: 0 auto;
}

.md-list {
  width: 320px;
  margin: 0 auto;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}

#description, #map{
  width: 40%;
  height: 90%;
  padding: 20px;
  overflow-x: auto;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0px 0px 12px #414141;
}


#description  {
  position: absolute;
  padding: 20px;
  margin-left: 50px;
}

#description ::-webkit-scrollbar {
  width: 16px;
}

#map {
  margin-left: 55%;
}
</style>