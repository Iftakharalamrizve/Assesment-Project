<template>
    <!-- Start content -->
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card m-b-20">
                        <div class="card-body">
                            <div class="row mb-2">
                                <div class="col-md-12">
                                    <button
                                        @click="createWarehouse()"
                                        data-toggle="modal"
                                        data-target=".bs-example-modal-lg"
                                        class="waves-effect waves-light btn btn-success pull-right"
                                    >
                                        <i class="fas fa-plus-square"></i>
                                    </button>
                                </div>
                            </div>
                            <table
                                id="datatable"
                                class="table table-bordered dt-responsive nowrap"
                                style="border-collapse: collapse; border-spacing: 0; width: 100%;"
                            >
                                <thead>
                                <tr>
                                    <th>#SL</th>
                                    <th>Name</th>
                                    <th>In charge</th>
                                    <th>Phone</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="(item, idx) in WarehouseList"
                                    :key="idx"
                                >
                                    <td>{{ idx + 1 }}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.in_charge}}</td>
                                    <td>{{item.phone_number}}</td>
                                    <td>{{item.location}}</td>
                                    <td>{{item.is_active}}</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-secondary waves-effect waves-light"
                                            title="Edit Supplier"
                                            @click="editWarehouse(item)"
                                        >
                                            <i class="far fa-edit"></i>
                                        </button>
                                        <button
                                            type="button"
                                            @click="deleteWarehouse(item.id)"
                                            class="btn btn-danger waves-effect waves-light"
                                            title="Delete Supplier"
                                        >
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- Modal content for the above example -->
        <div
            class="modal fade bs-example-modal-lg"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title mt-0" id="myLargeModalLabel">
                            {{ addEditMode ? "Create" : "Update" }} Warehouse
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-hidden="true"
                        >
                            ×
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card-body">
                            <div
                                class="alert alert-danger"
                                v-if="serverError"
                                role="alert"
                            >
                                {{ serverError }}
                            </div>
                            <form @submit.prevent="addEditMode ? storeWarehouse() : updateWarehouse()" >
                                <div class="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-bind:class="{
                                                'is-invalid': validationErrors.name
                                            }"
                                        name="name"
                                        placeholder="Type Name "
                                        v-model="info.name"
                                    />
                                    <small
                                        class="text-danger"
                                        v-if="validationErrors.name"
                                    >{{ validationErrors.name[0] }}</small
                                    >
                                </div>
                                <div class="form-group">
                                    <label>In Charge</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-bind:class="{
                                            'is-invalid': validationErrors.in_charge
                                        }"
                                        name="in_charge"
                                        placeholder="Type In Charge "
                                        v-model="info.in_charge"
                                    />
                                    <small
                                        class="text-danger"
                                        v-if="validationErrors.in_charge"
                                    >{{ validationErrors.in_charge[0] }}</small
                                    >
                                </div>

                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="phone_number"
                                        parsley-type="Type Phone Number "
                                        placeholder="Enter Phone Number "
                                        v-model="info.phone_number"
                                    />
                                    <small
                                        class="text-danger"
                                        v-if="validationErrors.phone_number"
                                    >{{ validationErrors.phone_number[0] }}</small
                                    >
                                </div>
                                <div class="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="location"
                                        parsley-type="Type Location "
                                        placeholder="Enter Location "
                                        v-model="info.location"
                                    />
                                </div>

                                <div class="form-group">
                                    <div>
                                        <button
                                            type="submit"
                                            class="btn btn-primary waves-effect waves-light"
                                        >
                                            {{
                                            addEditMode ? "Save" : "Update"
                                            }}
                                        </button>
                                        <button
                                            type="reset"
                                            class="btn btn-secondary waves-effect m-l-5"
                                            data-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
        <!-- container-fluid -->
    </div>
</template>

<script>

    export default {
        name: "warehouses",
        data() {
            return {
                info: {
                    name: "",
                    in_charge:"",
                    phone_number: "",
                    location: ""
                },
                WarehouseList: [],
                addEditMode: true
            };
        },
        created() {
            this.getWarehouseList();
        },
        mounted() {

        },
        computed: {
            validationErrors() {
                return this.$store.getters.validationErrors;
            },
            serverError() {
                return this.$store.getters.serverError;
            }
        },
        methods: {

            async getWarehouseList() {
                var response = await this.axios.get("/warehouses");
                try {
                    this.WarehouseList = response.data.data;
                } catch (e) {
                    this.WarehouseList = [];
                }
            },
            createWarehouse() {
                this.$store.commit("CLEAR_VALIDATION");
                this.addEditMode = true;
                this.$data.info = { ...this.$options.data.info };
            },
            storeWarehouse() {
                this.axios
                    .post("warehouses",this.info)
                    .then(response => {
                        this.$toast.success("Warehouse Created Successfully");
                        this.getWarehouseList();
                        $(".modal").modal("hide");
                    })
                    .catch(error => {
                        this.$store.commit("VALIDATION_ERROR", error);
                        this.$toast.error("Sorry Warehouse Can Not Created");
                    });
            },
            editWarehouse(editInfo) {
                this.addEditMode = false;
                this.$store.commit("CLEAR_VALIDATION");
                var data = editInfo;
                this.info = { ...data };
                $(".modal").modal("show");
            },
            updateWarehouse() {
                this.axios
                    .post("warehouse-update/" + this.info.id,this.info)
                    .then(response => {
                        this.$toast.success("Warehouse Updated Successfully");
                        this.getWarehouseList();
                        $(".modal").modal("hide");
                    })
                    .catch(error => {
                        this.$store.commit("VALIDATION_ERROR", error);
                        this.$toast.error("Sorry Supplier Can Not Updated");
                    });
            },
            deleteWarehouse(id){
                this.axios
                    .delete('warehouses/'+id)
                    .then(response=>{
                        this.$toast.success("Warehouse Delete Successfully");
                        this.getWarehouseList();
                    }).catch(error=>{
                    this.$toast.error("Sorry Warehouse Can Not Delete");
                })
            }
        }
    };
</script>

<style >


</style>
