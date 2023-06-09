using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotekaMS.Migrations
{
    /// <inheritdoc />
    public partial class rez : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervimi_AspNetUsers_Id",
                table: "Rezervimi");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervimi_Libri_Isbn",
                table: "Rezervimi");

            migrationBuilder.DropIndex(
                name: "IX_Rezervimi_Id",
                table: "Rezervimi");

            migrationBuilder.DropIndex(
                name: "IX_Rezervimi_Isbn",
                table: "Rezervimi");

            migrationBuilder.AlterColumn<string>(
                name: "Isbn",
                table: "Rezervimi",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Rezervimi",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rezervimi_Id",
                table: "Rezervimi",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervimi_Isbn",
                table: "Rezervimi",
                column: "Isbn");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervimi_AspNetUsers_Id",
                table: "Rezervimi",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervimi_Libri_Isbn",
                table: "Rezervimi",
                column: "Isbn",
                principalTable: "Libri",
                principalColumn: "Isbn",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervimi_AspNetUsers_Id",
                table: "Rezervimi");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervimi_Libri_Isbn",
                table: "Rezervimi");

            migrationBuilder.DropIndex(
                name: "IX_Rezervimi_Id",
                table: "Rezervimi");

            migrationBuilder.DropIndex(
                name: "IX_Rezervimi_Isbn",
                table: "Rezervimi");

            migrationBuilder.AlterColumn<string>(
                name: "Isbn",
                table: "Rezervimi",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Rezervimi",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervimi_AspNetUsers_Id",
                table: "Rezervimi",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervimi_Libri_Isbn",
                table: "Rezervimi",
                column: "Isbn",
                principalTable: "Libri",
                principalColumn: "Isbn");
        }
    }
}
