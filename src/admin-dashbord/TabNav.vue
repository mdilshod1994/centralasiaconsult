<template>
  <div>
    <ul class="admin-list">
      <div class="admin-logo">
        <router-link class="admin-list__link" to="/">
          <svg height="24" version="1.1" viewBox="0 0 139 95"
               xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <linearGradient id="linearGradient-1" x1="100%" x2="50%" y1="10.5120544%" y2="89.4879456%">
                <stop offset="0%" stop-color="#000000"></stop>
                <stop offset="100%" stop-color="#FFFFFF"></stop>
              </linearGradient>
              <linearGradient id="linearGradient-2" x1="64.0437835%" x2="37.373316%" y1="46.3276743%" y2="100%">
                <stop offset="0%" stop-color="#EEEEEE" stop-opacity="0"></stop>
                <stop offset="100%" stop-color="#FFFFFF"></stop>
              </linearGradient>
            </defs>
            <g id="Page-1" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path id="Path" class="text-primary"
                        d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                        style="fill:currentColor"></path>
                  <path id="Path1"
                        d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                        fill="url(#linearGradient-1)" opacity="0.2"></path>
                  <polygon id="Path-2" fill="#000000" opacity="0.049999997"
                           points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"></polygon>
                  <polygon id="Path-21" fill="#000000" opacity="0.099999994"
                           points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"></polygon>
                  <polygon id="Path-3" fill="url(#linearGradient-2)" opacity="0.099999994"
                           points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"></polygon>
                </g>
              </g>
            </g>
          </svg>
          <span>
                    CACG
                </span>
        </router-link>
      </div>
      <li v-for="tab in tabs" :key="tab" class="admin-item">
        <a :class="{ active: tab === selected}" class="admin-link" @click="setTab(tab)">
          {{ tab }}
        </a>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      typeof: Array,
      required: true,
    },
    selected: {
      typeof: String,
      required: true
    }
  },
  methods: {
    setTab(tab) {
      this.$emit('selected', tab);
    }
  },
  mounted() {

  },
}
</script>


<style scoped>
.admin-logo {
  padding: 15px 20px;
}

.admin-list__link {
  display: flex;
  align-items: center;
  color: #D0D2D6;
  padding: 10px;
  transform: scale(0.97);
  transition: 0.4s ease;
}

.admin-list__link:hover {
  transform: scale(1);
}

.admin-list__link svg {
  margin-right: 20px;
}

.admin-list__link span {
  font-weight: 600;
  letter-spacing: 2px;
}

.admin-item {
  cursor: pointer;
  transition: 0.4s ease;
  margin: 0 10px;
}

.admin-link.active {
  padding: 8px 10px 8px 20px;
  background: linear-gradient(118deg, #7367F0, rgba(115, 103, 240, 0.7));
  box-shadow: 0 0 10px 1px rgba(115, 103, 240, 0.7);
}

.admin-link {
  display: block;
  padding: 8px 15px;
  color: #D0D2D6 !important;
  font-weight: 500;
  font-size: 20px;
  border-radius: 6px;
}

.admin-item:first-of-type .admin-link {
  padding: 8px 15px;
  background: #0C102A;
  border-radius: 6px;
  margin-bottom: 10px;
  font-weight: 600 !important;
}

.admin-item:hover .admin-link {
  padding: 8px 10px 8px 20px;
  background: linear-gradient(118deg, #7367F0, rgba(115, 103, 240, 0.7));
  box-shadow: 0 0 10px 1px rgba(115, 103, 240, 0.7);
}

</style>
