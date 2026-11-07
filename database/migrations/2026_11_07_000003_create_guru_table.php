<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guru', function (Blueprint $table) {
            $table->increments('guru_id');
            $table->unsignedInteger('user_id')->unique();
            $table->string('nip', 30)->nullable()->unique();
            $table->string('nama', 100);
            $table->string('no_hp', 20)->nullable();

            $table->foreign('user_id')->references('user_id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guru');
    }
};
