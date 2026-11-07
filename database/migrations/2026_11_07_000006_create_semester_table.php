<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('semester', function (Blueprint $table) {
            $table->increments('semester_id');
            $table->unsignedInteger('tahun_ajaran_id');
            $table->enum('nama', ['Ganjil', 'Genap']);
            $table->date('tgl_mulai');
            $table->date('tgl_selesai');
            $table->boolean('is_active')->default(false);

            $table->foreign('tahun_ajaran_id')->references('tahun_ajaran_id')->on('tahun_ajaran');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('semester');
    }
};
