<?php


namespace Api\v1\User\Interfaces;

interface UserInterface
{

    public function all();

    public function create(array $data);

    public function update( $data, $id);

    public function delete($id);

    public function show($id);

    public function userLogin($data);


}
