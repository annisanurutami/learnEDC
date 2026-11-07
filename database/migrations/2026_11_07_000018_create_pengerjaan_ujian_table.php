<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengerjaan_ujian', function (Blueprint $table) {
            $table->increments('pengerjaan_ujian_id');
            $table->unsignedInteger('ujian_id');
            $table->unsignedInteger('siswa_id');
            $table->dateTime('mulai_at')->nullable();
            $table->dateTime('selesai_at')->nullable();
            $table->decimal('nilai_akhir', 5, 2)->nullable();

            $table->foreign('ujian_id')->references('ujian_id')->on('ujian');
            $table->foreign('siswa_id')->references('siswa_id')->on('siswa');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengerjaan_ujian');
    }
};
