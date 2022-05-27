CXX=g++
CXXFLAGS=-std=c++11

OBJECTS=simulation/falling-u
OBJECTS_LINK=simulation/u.cpp simulation/simulation.cpp

all: $(OBJECTS)

$(OBJECTS): %: %.cpp
	$(CXX) $(CXXFLAGS) -o $@.o $< $(OBJECTS_LINK)

clean:
	rm $(OBJECTS).o