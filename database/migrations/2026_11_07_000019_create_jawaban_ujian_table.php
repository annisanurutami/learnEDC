<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jawaban_ujian', function (Blueprint $table) {
            $table->increments('jawaban_ujian_id');
            $table->unsignedInteger('pengerjaan_ujian_id');
            $table->unsignedInteger('soal_ujian_id');
            $table->text('jawaban')->nullable();
            $table->decimal('skor', 5, 2)->nullable();

            $table->foreign('pengerjaan_ujian_id')->references('pengerjaan_ujian_id')->on('pengerjaan_ujian');
            $table->foreign('soal_ujian_id')->references('soal_ujian_id')->on('soal_ujian');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jawaban_ujian');
    }
};
