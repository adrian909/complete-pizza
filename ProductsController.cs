using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;

namespace FancyFoodTruck.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;

        public ProductsController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetProducts()
        {
            try
            {
                var query = _firestoreDb.Collection("products");
                var snapshot = await query.GetSnapshotAsync();
                
                var products = new List<object>();
                foreach (var doc in snapshot.Documents)
                {
                    // Convert Firestore document to the expected format with stringValue, doubleValue, etc.
                    var fields = ConvertToFirestoreFormat(doc.ToDictionary());
                    products.Add(new
                    {
                        name = doc.Reference.Path,
                        fields = fields
                    });
                }
                
                return Ok(new { documents = products });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // Helper method to convert regular values to Firestore format
        private Dictionary<string, object> ConvertToFirestoreFormat(Dictionary<string, object> data)
        {
            var result = new Dictionary<string, object>();
            
            foreach (var kvp in data)
            {
                result[kvp.Key] = ConvertValueToFirestoreFormat(kvp.Value);
            }
            
            return result;
        }

        private object ConvertValueToFirestoreFormat(object value)
        {
            if (value == null)
                return new { nullValue = "NULL_VALUE" };
            
            if (value is string strValue)
                return new { stringValue = strValue };
            
            if (value is double dblValue)
                return new { doubleValue = dblValue };
            
            if (value is int intValue)
                return new { integerValue = intValue };
            
            if (value is long longValue)
                return new { integerValue = longValue };
            
            if (value is bool boolValue)
                return new { booleanValue = boolValue };
            
            if (value is List<object> listValue)
            {
                var arrayValues = listValue.Select(ConvertValueToFirestoreFormat).ToList();
                return new { arrayValue = new { values = arrayValues } };
            }
            
            if (value is Dictionary<string, object> dictValue)
            {
                var fields = ConvertToFirestoreFormat(dictValue);
                return new { mapValue = new { fields = fields } };
            }
            
            // Default case
            return new { stringValue = value.ToString() };
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<object>> CreateProduct([FromBody] ProductRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Title))
                    return BadRequest("Title is required");

                var customizations = request.Customizations?.Select(c => new
                {
                    name = c.Name,
                    price = c.Price
                }).ToList() ?? new List<object>();

                var productData = new Dictionary<string, object>
                {
                    { "title", request.Title },
                    { "description", request.Description ?? "" },
                    { "price", request.Price },
                    { "category", request.Category ?? "" },
                    { "imageUrl", request.ImageUrl ?? "" },
                    { "customizations", customizations },
                    { "createdAt", DateTime.UtcNow }
                };

                var docRef = await _firestoreDb.Collection("products").AddAsync(productData);
                
                return Ok(new { id = docRef.Id, message = "Product created successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<object>> UpdateProduct(string id, [FromBody] ProductRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                    return BadRequest("Product ID is required");

                if (string.IsNullOrWhiteSpace(request.Title))
                    return BadRequest("Title is required");

                var customizations = request.Customizations?.Select(c => new
                {
                    name = c.Name,
                    price = c.Price
                }).ToList() ?? new List<object>();

                var productData = new Dictionary<string, object>
                {
                    { "title", request.Title },
                    { "description", request.Description ?? "" },
                    { "price", request.Price },
                    { "category", request.Category ?? "" },
                    { "imageUrl", request.ImageUrl ?? "" },
                    { "customizations", customizations },
                    { "updatedAt", DateTime.UtcNow }
                };

                var docRef = _firestoreDb.Collection("products").Document(id);
                await docRef.SetAsync(productData, SetOptions.Merge);
                
                return Ok(new { id = id, message = "Product updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<object>> DeleteProduct(string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                    return BadRequest("Product ID is required");

                await _firestoreDb.Collection("products").Document(id).DeleteAsync();
                
                return Ok(new { message = "Product deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    public class ProductRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Category { get; set; }
        public string ImageUrl { get; set; }
        public List<CustomizationItem> Customizations { get; set; }
    }

    public class CustomizationItem
    {
        public string Name { get; set; }
        public double Price { get; set; }
    }
}
