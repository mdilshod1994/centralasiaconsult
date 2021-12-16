<script>
import * as mykey from '../assets/js/custom'

export default {
    name:'MyComponent',
  data() {
    return {
      message: `Hello ${mykey.MY_CONST}!` // Hello Vue.js!
    }
  }
}
</script>