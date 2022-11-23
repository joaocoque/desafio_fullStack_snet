<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'João Victor Coque',
            'email' => 'joaocoque@gmail.com',
            'password' => bcrypt('12345678'),
            'birth' => '1999-01-26',
            'registration' => $this->generateUniqueRegistration(),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Victor João Coque ',
            'email' => 'joaocoque1@gmail.com',
            'password' => bcrypt('12345678'),
            'birth' => '1959-08-07',
            'registration' => $this->generateUniqueRegistration(),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Coque João Victor',
            'email' => 'joaocoque2@gmail.com',
            'password' => bcrypt('12345678'),
            'birth' => '1990-05-17',
            'registration' => $this->generateUniqueRegistration(),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Coque Victor João',
            'email' => 'joaocoque3@gmail.com',
            'password' => bcrypt('12345678'),
            'birth' => '1981-08-21',
            'registration' => $this->generateUniqueRegistration(),
            'email_verified_at' => now(),
        ]);
    }

    public function generateUniqueRegistration()
    {
        do {
            $registration = random_int(10000000, 99999999);
        } while (User::where("registration", "=", $registration)->first());

        return $registration;
    }
}
