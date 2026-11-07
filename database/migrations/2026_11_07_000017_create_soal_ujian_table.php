<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('soal_ujian', function (Blueprint $table) {
            $table->increments('soal_ujian_id');
            $table->unsignedInteger('ujian_id');
            $table->text('pertanyaan');
            $table->enum('tipe', ['pilgan', 'esai']);
            $table->json('opsi')->nullable();
            $table->text('kunci_jawaban')->nullable();
            $table->decimal('bobot', 5, 2)->default(1);

            $table->foreign('ujian_id')->references('ujian_id')->on('ujian');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('soal_ujian');
    }
};
