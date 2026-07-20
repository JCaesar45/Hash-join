from collections import defaultdict
import json

def hash_join(A, B):
    """High-performance hash join with multimap."""
    mb = defaultdict(list)
    for b in B:
        mb[b['character']].append(b)
    
    C = []
    for a in A:
        if a['name'] in mb:
            for b in mb[a['name']]:
                joined = {
                    "A_age": a['age'],
                    "A_name": a['name'],
                    "B_character": b['character'],
                    "B_nemesis": b['nemesis']
                }
                C.append(joined)
    return C

# Demo execution
if __name__ == "__main__":
    A = [{"age": 27, "name": "Jonah"}, ...]  # full test data
    print(json.dumps(hash_join(A, B), indent=2))
