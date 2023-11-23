using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotekaMS.Migrations
{
    /// <inheritdoc />
    public partial class isReturned : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "returnDate",
                table: "Huazimi",
                newName: "ReturnDate");

            migrationBuilder.RenameColumn(
                name: "currentDate",
                table: "Huazimi",
                newName: "CurrentDate");

            migrationBuilder.AddColumn<bool>(
                name: "isReturned",
                table: "Huazimi",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isReturned",
                table: "Huazimi");

            migrationBuilder.RenameColumn(
                name: "ReturnDate",
                table: "Huazimi",
                newName: "returnDate");

            migrationBuilder.RenameColumn(
                name: "CurrentDate",
                table: "Huazimi",
                newName: "currentDate");
        }
    }
}
