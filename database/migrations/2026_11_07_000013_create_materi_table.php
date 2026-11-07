<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('materi', function (Blueprint $table) {
            $table->increments('materi_id');
            $table->unsignedInteger('guru_mapel_id');
            $table->unsignedInteger('semester_id');
            $table->string('judul', 200);
            $table->text('deskripsi')->nullable();
            $table->string('file_path', 255)->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();

            $table->foreign('guru_mapel_id')->references('guru_mapel_id')->on('guru_mapel');
            $table->foreign('semester_id')->references('semester_id')->on('semester');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('materi');
    }
};
