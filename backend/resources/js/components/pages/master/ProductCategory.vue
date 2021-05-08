<template>
    <!-- Start content -->
    <div class="content">
        <div class="container-fluid">
            <!-- end row -->
            <div class="row">
                <div class="col-12">
                    <div class="card m-b-20">
                        <div class="card-body">
                            <div class="row mb-2">
                                <div class="col-md-12">
                                    <button
                                        @click="createCategory()"
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
                                    <th>Parent Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="(item, idx) in categoryList"
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
                                    <td>{{item.name}}</td>
                                    <td>{{item.parent?item.parent.name:''}}</td>
                                    <td>{{item.status}}</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-secondary waves-effect waves-light"
                                            title="Edit Supplier"
                                            @click="editCategory(item)"
                                        >
                                            <i class="far fa-edit"></i>
                                        </button>
                                        <button
                                            type="button"
                                            @click="deleteCategory(item.id)"
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
                            {{ addEditMode ? "Create" : "Update" }} Category
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
                            <form @submit.prevent="addEditMode ? storeCategory() : updateCategory()" >
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

                                    <label>Parent Category</label>
                                    <select name="parent_id" v-model="info.parent_id" class="form-control">
                                        <option value="0"> Select Parent Category</option>
                                        <option :value="item.id" v-for="item in categoryList">{{item.name}}</option>
                                    </select>
                                    <small
                                        class="text-danger"
                                        v-if="validationErrors.parent_id"
                                    >
                                        {{ validationErrors.parent_id[0] }}
                                    </small>
                                </div>

                                <div class="form-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="company_name"
                                        parsley-type="Type Company Name"
                                        placeholder="Enter Company Name"
                                        v-model="info.description"
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Image</label>
                                    <input
                                        type="file"
                                        class="form-control"
                                        name="image"
                                        @change="selectCategoryImage($event)"
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
    import Multiselect from 'vue-multiselect'
    export default {
        name: "product-category",
        data() {
            return {
                info: {
                    name: "",
                    parent_id:"0",
                    description: "",
                    image: ""
                },
                categoryList: [],
                addEditMode: true
            };
        },
        created() {
            this.getCategoryList();
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

            async getCategoryList() {
                var response = await this.axios.get("/categories");
                try {
                    this.categoryList = response.data.data;
                } catch (e) {
                    this.categoryList = [];
                }
            },
            createCategory() {
                this.$store.commit("CLEAR_VALIDATION");
                this.addEditMode = true;
                this.$data.info = { ...this.$options.data.info };
            },
            storeCategory() {
                this.axios
                    .post("categories", obj2fd(this.info))
                    .then(response => {
                        this.$toast.success("Category Created Successfully");
                        this.getCategoryList();
                        $(".modal").modal("hide");
                    })
                    .catch(error => {
                        this.$store.commit("VALIDATION_ERROR", error);
                        this.$toast.error("Sorry Category Can Not Created");
                    });
            },
            editCategory(editInfo) {
                this.addEditMode = false;
                this.$store.commit("CLEAR_VALIDATION");
                var data = editInfo;
                this.info = { ...data };
                this.info.image = "";
                $(".modal").modal("show");
            },
            updateCategory() {
                this.axios
                    .post("category-update/" + this.info.id, obj2fd(this.info))
                    .then(response => {
                        this.$toast.success("Category Updated Successfully");
                        this.getCategoryList();
                        $(".modal").modal("hide");
                    })
                    .catch(error => {
                        this.$store.commit("VALIDATION_ERROR", error);
                        this.$toast.error("Sorry Supplier Can Not Updated");
                    });
            },
            deleteCategory(id){
                this.axios
                    .delete('categories/'+id)
                    .then(response=>{
                        this.$toast.success("Category Delete Successfully");
                        this.getCategoryList();
                    }).catch(error=>{
                    this.$toast.error("Sorry Category Can Not Delete");
                })
            },
            selectCategoryImage(event) {
                this.info.image = event.target.files[0];
            }
        }
    };
</script>

<style >


</style>
