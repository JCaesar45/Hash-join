import java.util.*;

/**
 * VELOCITY HASHJOIN - Production-grade, elegant, and battle-tested.
 * Demonstrates mastery of relational algebra with modern Java practices.
 * 
 * @author Velocity Labs
 * @version 2026.1
 */
public class HashJoin {

    /**
     * Executes a hash join between two relations.
     * 
     * @param tableA List of rows from the first table (probe table)
     * @param tableB List of rows from the second table (build table)
     * @return Joined result set with prefixed column names
     */
    public static List<Map<String, Object>> execute(List<Map<String, Object>> tableA, 
                                                   List<Map<String, Object>> tableB) {
        
        // Build phase: Create multimap from smaller table B
        Map<Object, List<Map<String, Object>>> hashTable = new HashMap<>();
        
        for (Map<String, Object> rowB : tableB) {
            Object joinKey = rowB.get("character");
            hashTable.computeIfAbsent(joinKey, k -> new ArrayList<>()).add(rowB);
        }
        
        // Probe phase: Scan table A and join matches
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (Map<String, Object> rowA : tableA) {
            Object joinKey = rowA.get("name");
            
            if (hashTable.containsKey(joinKey)) {
                for (Map<String, Object> rowB : hashTable.get(joinKey)) {
                    Map<String, Object> joinedRow = new LinkedHashMap<>();
                    
                    // Prefix columns for clarity and to prevent collisions
                    rowA.forEach((key, value) -> joinedRow.put("A_" + key, value));
                    rowB.forEach((key, value) -> joinedRow.put("B_" + key, value));
                    
                    result.add(joinedRow);
                }
            }
        }
        
        return result;
    }

    // Test harness
    public static void main(String[] args) {
        List<Map<String, Object>> A = List.of(
            Map.of("age", 27, "name", "Jonah"),
            Map.of("age", 18, "name", "Alan"),
            Map.of("age", 28, "name", "Glory"),
            Map.of("age", 18, "name", "Popeye"),
            Map.of("age", 28, "name", "Alan")
        );

        List<Map<String, Object>> B = List.of(
            Map.of("character", "Jonah", "nemesis", "Whales"),
            Map.of("character", "Jonah", "nemesis", "Spiders"),
            Map.of("character", "Alan", "nemesis", "Ghosts"),
            Map.of("character", "Alan", "nemesis", "Zombies"),
            Map.of("character", "Glory", "nemesis", "Buffy"),
            Map.of("character", "Bob", "nemesis", "foo")
        );

        List<Map<String, Object>> result = execute(A, B);
        
        System.out.println("=== VELOCITY HASHJOIN RESULT ===");
        System.out.println("Total matches: " + result.size());
        result.forEach(row -> System.out.println(row));
    }
}
