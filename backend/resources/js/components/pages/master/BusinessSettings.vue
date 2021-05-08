<template>
    <div class="container-fluid">
        <form @submit.prevent="saveBusinessSettings">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 mb-4">
                            <!-- Settings -->
                            <div class="card shadow mb-4">
                                <div class="card-body">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Business Days</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Monday - Saturday"
                                                v-model="businessSettings.business_days"
                                            />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Closed Day</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Sunday"
                                                v-model="businessSettings.closed_days"
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            placeholder="+15014134769"
                                            v-model="businessSettings.phone_number"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="9813 W Markham"
                                            v-model="businessSettings.address"
                                        />
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Little Rock"
                                                v-model="businessSettings.city"
                                            />
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="inputZip">Zip</label>
                                            <input type="text" class="form-control" placeholder="Arkansas 72205">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="inputState">State</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="United States"
                                                v-model="businessSettings.state"
                                            />
                                        </div>

                                    </div>
                                    <button type="submit" class="btn btn-success">Update Informations</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
    </div>
</template>
<script>
export default {
    name: "business-settings",
    data() {
        return{
            businessSettings:{
                'business_days':'',
                'closed_days':'',
                'phone_number':'',
                'address':'',
                'city':'',
                'zip':'',
                'state':'',
                'facebook_url':'',
                'instagram_url':'',
                'twitter_url':'',
                'linkedin_url':'',
                'googleplus_url':'',
                'youtube_url':''
            }
        }
    },
};
</script>
