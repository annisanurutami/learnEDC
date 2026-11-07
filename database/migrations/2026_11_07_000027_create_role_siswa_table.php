<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('role_siswa', function (Blueprint $table) {
            $table->increments('role_siswa_id');
            $table->unsignedInteger('kelas_id');
            $table->unsignedInteger('siswa_id');
            $table->unsignedInteger('semester_id');
            $table->enum('role', ['ketua', 'wakil', 'sekretaris', 'bendahara']);

            $table->foreign('kelas_id')->references('kelas_id')->on('kelas');
            $table->foreign('siswa_id')->references('siswa_id')->on('siswa');
            $table->foreign('semester_id')->references('semester_id')->on('semester');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('role_siswa');
    }
};
