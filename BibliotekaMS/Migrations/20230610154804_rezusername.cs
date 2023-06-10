using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotekaMS.Migrations
{
    /// <inheritdoc />
    public partial class rezusername : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Rezervimi",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "Rezervimi");
        }
    }
}
