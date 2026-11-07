<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rapor', function (Blueprint $table) {
            $table->increments('rapor_id');
            $table->unsignedInteger('siswa_id');
            $table->unsignedInteger('kelas_id');
            $table->unsignedInteger('semester_id');
            $table->enum('status', ['draft', 'final'])->default('draft');
            $table->string('file_path', 255)->nullable();
            $table->date('tgl_cetak')->nullable();

            $table->foreign('siswa_id')->references('siswa_id')->on('siswa');
            $table->foreign('kelas_id')->references('kelas_id')->on('kelas');
            $table->foreign('semester_id')->references('semester_id')->on('semester');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rapor');
    }
};
