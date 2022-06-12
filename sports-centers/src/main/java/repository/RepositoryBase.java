package repository;

import java.util.Collection;

public interface RepositoryBase<T> {
	public Collection<T> getAll();
	public T getById(String id);
	public void create(String id, T item);
	public void delete(String id);
	public void update(String id,T item);
}
