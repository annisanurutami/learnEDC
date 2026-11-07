<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengumpulan_tugas', function (Blueprint $table) {
            $table->increments('pengumpulan_tugas_id');
            $table->unsignedInteger('tugas_id');
            $table->unsignedInteger('siswa_id');
            $table->string('file_path', 255)->nullable();
            $table->text('jawaban_teks')->nullable();
            $table->dateTime('submitted_at')->nullable()->useCurrent();
            $table->decimal('nilai', 5, 2)->nullable();
            $table->text('catatan_guru')->nullable();

            $table->foreign('tugas_id')->references('tugas_id')->on('tugas');
            $table->foreign('siswa_id')->references('siswa_id')->on('siswa');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengumpulan_tugas');
    }
};
