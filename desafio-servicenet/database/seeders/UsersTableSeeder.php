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
            'name' => 'João Victor Pinheiro',
            'email' => 'joaocoque@gmail.com',
            'password' => bcrypt('12345678'),
            'birth' => '1999-01-26',
            'registration' => $this->generateUniqueRegistration(),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Osvaldo Ruan Manuel de Paula',
            'email' => 'osvaldo.ruan.depaula@fpsgeodata.com.br',
            'password' => bcrypt('ZGs8CICD6s'),
            'birth' => '1959-08-07',
            'registration' => $this->generateUniqueRegistration(),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Nathan Márcio Edson Dias',
            'email' => 'nathan-dias95@monetto.com.br',
            'password' => bcrypt('dHkclQxzml'),
            'birth' => '1990-05-17',
            'registration' => $this->generateUniqueRegistration(),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Luiza Lara Gomes',
            'email' => 'luiza.lara.gomes@bcconsult.com.br',
            'password' => bcrypt('XJnm7pgOiW'),
            'birth' => '1981-08-21',
            'registration' => $this->generateUniqueRegistration(),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Jennifer Caroline Martins',
            'email' => 'jennifer-martins94@embraer.com.br',
            'password' => bcrypt('XJnm7pgOiW'),
            'birth' => '1992-07-05',
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
