<template>
    <!-- Start content -->
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="page-title-box">
                        <h4 class="page-title">Supplier List</h4>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <routelink :to="{name:'dashboard-page'}">
                                    Home
                                </routelink>
                            </li>
                            <li class="breadcrumb-item">
                                <routelink :to="{name:'product-list'}">
                                    Product List
                                </routelink>
                            </li>
                        </ol>
                        <div class="state-information d-none d-sm-block">
                            <div class="state-graph">
                                <div id="header-chart-1"></div>
                                <div class="info"></div>
                            </div>
                            <div class="state-graph">
                                <div id="header-chart-2"></div>
                                <div class="info"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end row -->
            <div class="row">
                <div class="col-12">
                    <div class="card m-b-20">
                        <div class="card-body">
                            <div class="row mb-2">
                                <div class="col-md-12">
                                    <button
                                        @click="createSupplier()"
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
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Company Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="(item, idx) in supplierList"
                                    :key="idx"
                                >
                                    <td>{{ idx + 1 }}</td>
                                    <td>
                                        <img
                                            :src="$baseURL + item.image"
                                            alt=""
                                            style="height:50px;width:50px"
                                        />
                                    </td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.phone_number }}</td>

                                    <td>{{ item.company_name }}</td>
                                    <td>{{ item.email }}</td>
                                    <td>{{ item.address }}</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-primary waves-effect waves-light"
                                            title="View Supplier"
                                        >
                                            <i class="far fa-eye"></i>
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-secondary waves-effect waves-light"
                                            title="Edit Supplier"
                                            @click="editSupplier(item)"
                                        >
                                            <i class="far fa-edit"></i>
                                        </button>
                                        <button
                                            type="button"
                                            @click="deleteSupplier(item.id)"
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
                            {{ addEditMode ? "Create" : "Update" }} Supplier
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
                            <form @submit.prevent="addEditMode ? storeSupplier() : updateSupplier()" >
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
                                    <label>E-Mail</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        name="eamil"
                                        parsley-type="email"
                                        placeholder="Enter a valid e-mail"
                                        v-model="info.email"
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-bind:class="{
                                            'is-invalid':
                                                validationErrors.phone_number
                                        }"
                                        name="phone_number"
                                        parsley-type="Type Phone Number"
                                        placeholder="Enter a Phone Number"
                                        v-model="info.phone_number"
                                    />
                                    <small
                                        class="text-danger"
                                        v-if="validationErrors.phone_number"
                                    >
                                        {{ validationErrors.phone_number[0] }}
                                    </small>
                                </div>

                                <div class="form-group">
                                    <label>Company Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="company_name"
                                        parsley-type="Type Company Name"
                                        placeholder="Enter Company Name"
                                        v-model="info.company_name"
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="address"
                                        parsley-type="Type Address"
                                        placeholder="Enter Address"
                                        v-model="info.address"
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Image</label>
                                    <input
                                        type="file"
                                        class="form-control"
                                        name="image"
                                        @change="selectSupplierImage($event)"
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
    import obj2fd from "obj2fd";
    export default {
        name: "product-list",
        data() {
            return {
                info: {
                    name: "",
                    email: "",
                    phone_number: "",
                    address: "",
                    company_name: "",
                    image: ""
                },
                config: { headers: { "Content-Type": "multipart/form-data" } },
                supplierList: [],
                addEditMode: true
            };
        },
        mounted() {
            this.getSupplierList();
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
            async getSupplierList() {
                var response = await this.axios.get("/suppliers");
                try {
                    this.supplierList = response.data.data;
                } catch (e) {
                    this.supplierList = [];
                }
            },
            createSupplier() {
                this.$store.commit("CLEAR_VALIDATION");
                // Object.assign(this.info, this.$options.data.info);
                this.addEditMode = true;
                this.$data.info = { ...this.$options.data.info };
            },
            storeSupplier() {
                this.axios
                    .post("suppliers", obj2fd(this.info))
                    .then(response => {
                        this.$toast.success("Supplier Created Successfully");
                        this.getSupplierList();
                        $(".modal").modal("hide");
                    })
                    .catch(error => {
                        this.$store.commit("VALIDATION_ERROR", error);
                        this.$toast.error("Sorry Supplier Can Not Created");
                    });
            },
            editSupplier(editInfo) {
                this.addEditMode = false;
                this.$store.commit("CLEAR_VALIDATION");
                var data = editInfo;
                this.info = { ...data };
                this.info.image = "";
                $(".modal").modal("show");
            },
            updateSupplier() {
                this.axios
                    .post("supplier-update/" + this.info.id, obj2fd(this.info))
                    .then(response => {
                        this.$toast.success("Supplier Updated Successfully");
                        this.getSupplierList();
                        $(".modal").modal("hide");
                    })
                    .catch(error => {
                        this.$store.commit("VALIDATION_ERROR", error);
                        this.$toast.error("Sorry Supplier Can Not Updated");
                    });
            },
            deleteSupplier(id){
                this.axios
                    .delete('suppliers/'+id)
                    .then(response=>{
                        this.$toast.success("Supplier Delete Successfully");
                        this.getSupplierList();
                    }).catch(error=>{
                    this.$toast.error("Sorry Supplier Can Not Delete");
                })
            },
            selectSupplierImage(event) {
                this.info.image = event.target.files[0];
            }
        }
    };
</script>

<style scoped></style>
