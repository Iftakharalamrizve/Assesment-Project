<template>
    <div class="container-fluid">
<!--        <div class="row">-->
<!--            <div class="col-sm-12">-->
<!--                <div class="page-title-box">-->
<!--                    <h4 class="page-title">Purchase Entry</h4>-->
<!--                    <ol class="breadcrumb">-->
<!--                        <li class="breadcrumb-item active">You can manage your purchase entry/invoice here</li>-->
<!--                    </ol>-->
<!--                    <div class="state-information d-none d-sm-block">-->
<!--                        <div class="state-graph">-->
<!--                            <div id="header-chart-1"></div>-->
<!--                            <div class="info">Balance $ 2,317</div>-->
<!--                        </div>-->
<!--                        <div class="state-graph">-->
<!--                            <div id="header-chart-2"></div>-->
<!--                            <div class="info">Item Sold 1230</div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <!-- end row -->
        <form @submit.prevent="saveBusinessSettings">
            <div class="row">
                <div class="col-lg-12 col-md-12 mb-4">
                    <!-- Settings -->
                    <div class="card shadow mb-4">
                        <div class="card-body">
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label>Purchase Invoice Number</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Write invoice number"
                                    />
                                </div>
                                <div class="form-group col-md-3">
                                    <label style="display: block">Purchase Date</label>
                                    <date-picker v-model="purchase.purchase_date" placeholder="Select date" format="DD-MM-YYYY" valueType="format" input-class="form-control"></date-picker>
                                </div>
                                <div class="form-group col-md-3">
                                    <label>Supplier</label>
                                    <autocomplete
                                        ref="autocomplete"
                                        placeholder="Search and Select product"
                                        :source="suppliers"
                                        input-class="form-control"
                                        v-model="purchase.p_id"
                                        results-display="name">
                                        <span slot="noResults"><button class="btn btn-success btn-sm">Add New Product</button></span>
                                    </autocomplete>

                                </div>
                                <div class="form-group col-md-3">
                                    <label>Add Product By Barcode</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Scan barcode to insert product"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <table class="table table-sm table-bordered purchase-table">
                                    <thead>
                                    <tr>
                                        <th scope="col" width="5%">Serial</th>
                                        <th scope="col">Product</th>
                                        <th scope="col" width="10%">Units</th>
                                        <th scope="col" width="10%">Qty</th>
                                        <th scope="col" width="10%">Price(Buying)</th>
                                        <th scope="col" width="10%">Price(W.S)</th>
                                        <th scope="col" width="10%">Price(Retail)</th>
                                        <th scope="col" width="10%">Total</th>
                                        <th scope="col" width="10%">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <autocomplete
                                                    ref="autocomplete"
                                                    placeholder="Search and Select product"
                                                    :source="suppliers"
                                                    input-class="form-control"
                                                    v-model="purchase.p_id"
                                                    results-display="name">
                                                    <span slot="noResults"><button class="btn btn-success btn-sm">Add New Product</button></span>
                                                </autocomplete>
                                            </td>
                                            <td>
                                                <autocomplete
                                                    ref="autocomplete"
                                                    placeholder="Units"
                                                    :source="suppliers"
                                                    input-class="form-control"
                                                    v-model="purchase.p_id"
                                                    results-display="name">
                                                    <span slot="noResults"><button class="btn btn-success btn-sm">Add Unit</button></span>
                                                </autocomplete>
                                            </td>
                                            <td>
                                                <input type="number" class="form-control" placeholder="0"/>
                                            </td>
                                            <td>
                                                <input type="number" class="form-control" placeholder="0"/>
                                            </td>
                                            <td>
                                                <input type="number" class="form-control" placeholder="0"/>
                                            </td>
                                            <td>
                                                <input type="number" class="form-control" placeholder="0"/>
                                            </td>
                                            <td>
                                                <input type="number" class="form-control" placeholder="0"/>
                                            </td>
                                            <td>
                                                <a href="" class="btn btn-success btn-md">
                                                    <i class="mdi mdi-plus"></i>
                                                </a>
                                                <a href="" class="btn btn-danger btn-md">
                                                    <i class="mdi mdi-delete"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="6" class="text-right"></td>
                                            <td class="text-right">Sub Total</td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" class="text-right"></td>
                                            <td  class="text-right">(+)VAT(15%)</td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" class="text-right"></td>
                                            <td  class="text-right">(-)Discount</td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" class="text-right"></td>
                                            <td  class="text-right">Net Payable</td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" class="text-right"></td>
                                            <td  class="text-right">Paid</td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" class="text-right"></td>
                                            <td  class="text-right">Due</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Multiselect from 'vue-multiselect'
import Autocomplete from 'vuejs-auto-complete'

export default {
    name: "add-purchase",
    components:{
        DatePicker,
        Multiselect,
        Autocomplete,
    },
    data(){
        return{
            purchase:{
                purchase_date:null,
                supplier_id:'',
                p_id:''
            },
            suppliers:[],
        }
    },
    methods:{
      getSuppliers(){
          this.axios
              .get('purchases/get-suppliers')
              .then(response=>{
                  this.suppliers=response.data.suppliers;
              })
              .catch(error=>{
                  console.log(error);
              })
              .finally(()=>{

              });
      }
    },
    created() {
        this.getSuppliers();
    }

};
</script>

<style scoped>
    .purchase-table > tbody > tr > td{
        padding: 2px !important;
    }
    .purchase-table > thead{
        background-color:#2b3a4a !important;
        color: #ffffff;
    }
    .purchase-table > tfoot > tr > td{
        padding: 5px !important;
        border-top: 0px !important;
    }
</style>
