using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotekaMS.Migrations
{
    /// <inheritdoc />
    public partial class rezcreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rezervimi",
                columns: table => new
                {
                    RezervimiId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Isbn = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezervimi", x => x.RezervimiId);
                    table.ForeignKey(
                        name: "FK_Rezervimi_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Rezervimi_Libri_Isbn",
                        column: x => x.Isbn,
                        principalTable: "Libri",
                        principalColumn: "Isbn");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rezervimi_Id",
                table: "Rezervimi",
                column: "Id",
                unique: true,
                filter: "[Id] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervimi_Isbn",
                table: "Rezervimi",
                column: "Isbn",
                unique: true,
                filter: "[Isbn] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rezervimi");
        }
    }
}
